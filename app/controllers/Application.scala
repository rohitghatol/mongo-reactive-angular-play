package controllers

import models.Employee
import models.Employee._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.Logger
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import utils.SecureActions


/**
 * REST API Controller providing CRUD operations for Employees with Reactive Mongo in a full async API
 */
object Application extends Controller with MongoController with SecureActions {

  /**
   * A reference of a JSON style collection in Mongo
   */
  private def employeesCollection = db.collection[JSONCollection]("employees")

  /**
   * Convinience helper thar marshalls json or sends a 404 if none found
   */
  private def asJson(v: Option[JsObject]) = v.map(Ok(_)).getOrElse(NotFound)

  

  /**
   * Actions that reactively list all employees in the collection
   */
  def listEmployees() = SimpleAuthenticatedAction {
    _ =>
      employeesCollection
        .find(Json.obj())
        .cursor[JsObject]
        .collect[List]() map {
        employees =>
          Ok(JsArray(employees))
      }
  }

  /**
   * Finds a employee by Id
   */
  def findEmployee(id: String) = SimpleAuthenticatedAction {
    _ =>
      employeesCollection
        .find(Json.obj("_id" -> id))
        .one[JsObject] map asJson
  }

  /**
   * Adds a employee
   */
  def addEmployee() = JsonAuthenticatedAction[Employee] {
    (employee, _) =>
      employeesCollection.insert(employee) map {
        _ => Ok(Json.toJson(employee))
      }
  }

  def removeId (json:JsObject) : JsObject = {
     var result = json - "_id";
     return result;
  }

  /**
   * Partially updates the properties of a employee
   */
  def updateEmployee(id: String) = JsonAuthenticatedAction[JsObject] {

    (json, _) =>
      for {
        _ <- employeesCollection.update(Json.obj("_id" -> id), Json.obj("$set" -> removeId(json)))
        newEmployee <- employeesCollection.find(Json.obj("_id" -> id)).one[JsObject]
      } yield asJson(newEmployee)
  }

  /**
   * Deletes a employee by id
   */
  def deleteEmployee(id: String) = SimpleAuthenticatedAction {
    _ =>
      for {
        newEmployee <- employeesCollection.find(Json.obj("_id" -> id)).one[JsObject]
        _ <- employeesCollection.remove(Json.obj("_id" -> id))
      } yield asJson(newEmployee)
  }

}