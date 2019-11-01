const _ = require('lodash')

const person = {
    name: "Nguyen van A",
    age: 23,
    education: {
        primary: "le van tam",
        secondary: "cap 2",
        university: [
            {
                name: "Dai hoc BK"
            }
        ]
    }
}
// console.log(person.name,person.education.university[0])
// console.log(_.get(person,"education.university[0].name"))
// _.set(person,"job:[0].name","Lap trinh vien")
// console.log(person)
/**
 * @param Object.keys check null object in javascript
 */
const course = { name: "" }
console.log("Day la object rong", Object.keys(course).length > 0 ? false : true)

//use lodash
console.log(_.isEmpty(course)?true:false)