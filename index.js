const csv2json = require("convert-csv-to-json");
const fs = require("fs");
const { ceil } = require("lodash");
const _ = require("lodash");

let inputFile = "input.csv";

const data = csv2json.parseSubArray(";").getJsonFromCsv(inputFile);

const sorted = data.sort(function (a, b) {
  return a["writer_id"] - b["writer_id"];
});

function prepareData(objArray) {
  const dataArray = [];

  for (let i = 0; i < objArray.length; i++) {
    const dataObject = {
      writer_id: "",
      tale_ids: [],
      published_tales: [],
      no_of_tales: 0,
      published: 0,
      no_of_unpublished_tales: 0,
    };
    if (dataObject.writer_id !== objArray[i]["writer_id"]) {
      dataObject.writer_id = objArray[i]["writer_id"];
      for (let j = 0; j < objArray.length; j++) {
        if (dataObject.writer_id === objArray[j]["writer_id"]) {
          dataObject.tale_ids.push(objArray[j]["tale_id"]);
        }
      }
      dataObject.no_of_tales = dataObject.tale_ids.length;
      dataObject.no_of_unpublished_tales =
        Math.ceil(dataObject.tale_ids.length / 2) === 0
          ? 1
          : Math.ceil(dataObject.tale_ids.length / 2);
    }
    dataArray.push(dataObject);
  }
  return dataArray;
}

const output = prepareData(sorted);
const stringii = output.map((e) => JSON.stringify(e));
const objjj = new Set(stringii);
const obj1 = [...objjj];
const obj2 = obj1.map((e) => JSON.parse(e));

const sorted1 = obj2.sort(function (a, b) {
  return b["no_of_unpublished_tales"] - a["no_of_unpublished_tales"];
});

fs.writeFileSync("./preparedData.json", JSON.stringify(obj2, null, 2), "utf-8");

let schedule = [];

let sum = 0;

sorted1.forEach((data) => {
  sum += data.no_of_unpublished_tales;
});

function publish_new(publishArray, days) {
  let day = {
    post: [],
    day_number: 0,
  };
  let i = 0,
    j = 0;
  day.day_number = days;
  while (i < 10) {
    let posts = {
      writer_id: "",
      tale_id: "",
      no_of_tales_published_till_date: 0,
    };
    if (j === publishArray.length) {
      j = 0;
    }
    if (publishArray[j].no_of_unpublished_tales > 0) {
      publishArray[j].published_tales.push(publishArray[j].tale_ids.pop());
      publishArray[j].no_of_unpublished_tales =
        publishArray[j].no_of_unpublished_tales - 1;
      publishArray[j].published = publishArray[j].published + 1;
      posts.writer_id = publishArray[j].writer_id;
      posts.tale_id =
        publishArray[j].published_tales[
          publishArray[j].published_tales.length - 1
        ];
      posts.no_of_tales_published_till_date = publishArray[j].published;
      day.post.push(posts);
      i++;
      j++;
    } else {
      j++;
    }
  }
  schedule.push(day);
  const newArray = publishArray.filter((a) => {
    return a.no_of_unpublished_tales > 0;
  });
  const sort1 = _.orderBy(
    newArray,
    ["published", "no_of_unpublished_tales"],
    ["asc", "desc"]
  );
  return sort1;
}

data1 = sorted1;
for (let i = 1; i < 31; i++) {
  data1 = publish_new(data1, i);
}

console.log(JSON.stringify(schedule, null, 4));

console.log(sum);
