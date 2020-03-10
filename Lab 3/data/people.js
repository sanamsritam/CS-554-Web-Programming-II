const axios = require("axios").default;

async function getPeople() {
  const response = await axios.get(
    "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json"
  );
  return response;
}

async function getPersonById(pass) {
  const pass1 = parseInt(pass);
  //   console.log(typeof pass1);
  if (pass1 == undefined) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Please enter an ID");
      }, 5000);
    });
    //throw "Please enter an ID";
  }

  if (pass1 < 1 || pass1 > 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("ID cannot be greater than 1000 or less than 1");
      }, 5000);
    });
    //throw "ID cannot be greater than 1000 or less than 1";
  }

  if (!Number.isInteger(pass1)) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("ID can only be of type Number");
      }, 5000);
    });
    // throw "ID can only be of type Number";
  }
  const data1 = await getPeople();
  var name;
  var data12;
  for (let key in data1.data) {
    if (data1.data[key].id === pass1) {
      //   var lname = data1.data[key].lastName;
      //   var fname = data1.data[key].firstName;
      //   fname = fname.concat(" ");
      //   name = fname.concat(lname);
      data12 = data1.data[key];
    }
  }

  console.log(data12);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data12);
    }, 5000);
  });
}

// async function main() {
//   try {
//     // console.log("IN MAIN");
//     const test = await getPersonById(1001);
//     console.log(test);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();

module.exports = {
  firstName: "Sanam",
  lastName: "Jena",
  studentId: "10454295",
  getPersonById
};
