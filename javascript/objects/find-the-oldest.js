function findTheOldest(arr){
    return arr.reduce(((oldest, person) => {
        let currentDate = new Date()
        let personAge = 0
        let oldestAge = Object.hasOwn(oldest, "yearOfDeath") ?
						oldest.yearOfDeath - oldest.yearOfBirth:
                        currentDate.getFullYear() - oldest.yearOfBirth;
        if(!Object.hasOwn(person, "yearOfDeath")){
            age = currentDate.getFullYear() - person.yearOfBirth
        } else{
            age = person.yearOfDeath - person.yearOfBirth
        }

        if (age > oldestAge){
            oldest = person
        }

        return oldest
    }), {name: "Person", yearOfBirth: 0, yearOfDeath: 0})
}

let people = [
	{
		name: "Carly",
		yearOfBirth: 1942,
		yearOfDeath: 1970,
	},
	{
		name: "Ray",
		yearOfBirth: 1962,
		yearOfDeath: 2011,
	},
	{
		name: "Jane",
		yearOfBirth: 1912,
		yearOfDeath: 1941,
	},
];
console.log(findTheOldest(people));
// Should return:
// {name: "Ray", yearOfBirth: 1962, yearOfDeath: 2011,}

people = [
	{
		name: "Carly",
		yearOfBirth: 2018,
	},
	{
		name: "Ray",
		yearOfBirth: 1962,
		yearOfDeath: 2011,
	},
	{
		name: "Jane",
		yearOfBirth: 1912,
		yearOfDeath: 1941,
	},
];
console.log(findTheOldest(people))
// Should return:
// {name: "Ray", yearOfBirth: 1962, yearOfDeath: 2011,}