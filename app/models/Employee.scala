package models

import reactivemongo.bson.BSONObjectID
import play.api.libs.json.Json

/**
 * Nothing like a cold Employee!
 * @param _id the mongo db id, we provide a string one for simplicity
 * @param firstName a mandatory firstName
 * @param lastName a mandatory lastName
 */
case class Employee(
                 _id : String = BSONObjectID.generate.toString(),
                 firstName : String,
                 lastName : String
                 )

/**
 * Companion object provides JSON serialization thanks to Play JSON formats
 */
object Employee {
  implicit val EmployeesFormat = Json.format[Employee]
}