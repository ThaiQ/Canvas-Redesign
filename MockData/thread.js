const objSuccess =
{
    CourseID: "ffw2d2e2122",
    BoardID: "agb212d22",
    Body: [
        {
            name: "John",
            reply: "looking good!"
        },
        {
            name: "Jeff",
            reply: "Email me the code!"
        }
    ],
    Date: Date.now,
    ThreadID: "ff32212ed" 
}

const objUpdate =
{
    CourseID: "ffw2d2e2122",
    BoardID: "agb212d22",
    Body: [
        {
            name: "John",
            reply: "looking good!"
        },
        {
            name: "Jeff",
            reply: "Email me the code!"
        },
        {
            name: "Mona",
            reply: "Push to github"
        }
    ],
    Date: Date.now,
    ThreadID: "ff32212ed" 
}

const objfail =
{
    CourseID: "ffw2d2e2122",
    Body: [
        {
            name: "John",
            reply: "looking good!"
        }
    ],
    Date: Date.now,
}

module.exports = { objSuccess, objUpdate, objfail }