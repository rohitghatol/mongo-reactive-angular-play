package models

import play.api.libs.json.Json

case class Address(street : String)

case class Person(name : String, lastName : String, address : Option[Address] = None)

trait JSONFormats {

  implicit val addressFormats = Json.format[Address]
  implicit val personFormats = Json.format[Person]

}