package controllers

import play.api._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.functional.syntax._
import play.api.libs.json._
import scala.concurrent.Future
import models.{JSONFormats, Person}

// Reactive Mongo imports
import reactivemongo.api._

// Reactive Mongo plugin, including the JSON-specialized collection
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection

//FIXME - This is a quick example, in real world this would be broken down into Services, Repository etc
object Application extends Controller with MongoController with JSONFormats {

  def collection: JSONCollection = db.collection[JSONCollection]("people")

  def people = Action.async(parse.anyContent) { request =>
    val peopleList = collection.find(Json.obj()).cursor[Person].collect[List](upTo = 100, stopOnError = true)
    peopleList map (list => Ok(Json.toJson(list))) recover {
      case e : Exception => InternalServerError("Unable to create Person")
    }
  }

  def addPerson = Action.async(parse.json) { request =>
    request.body.validate[Person] match {
      case JsSuccess(person, _) =>
        val insertResult = collection.insert(person)
        insertResult map (_ => Created("Person created successfully"))
      case JsError(error) => Future.successful(BadRequest(error.toString()))
    }

  }

}