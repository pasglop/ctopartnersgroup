require('dotenv').config();
const Multipart = require('lambda-multipart');
const request = require('request');
const Trello = require('node-trello');

const SLACK_URL = process.env.SLACK_URL;
const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_LIST_ID = process.env.TRELLO_LIST_ID; // Get the listId: https://api.trello.com/1/boards/59b89aca8e84140f44acd2fa?fields=id,name&lists=open&list_fields=id,name,closed,pos&key=KEY&token=TOKEN


const sendToSlack = (name, email, phone, message) => {
  let fields = [
    {
      title: "Name", value: name, short: false
    },
    {
      title: "Email", value: email, short: false
    },
    {
      title: "Phone", value: phone, short: false
    },
    {
      title: "Message", value: message, short: false
    }
  ];
  if (message) fields.push({ title: "Message", value: message, short: false });
  let data = {
    icon_emoji: ":nimbus:",
    attachments: [
      {
        fallback: "New SU register",
        color: "#36a64f",
        author_name: "Web enquiry",
        fields: fields
      }
    ]
  };

  request({
    url: SLACK_URL,
    method: "POST",
    json: true,
    body: data
  }, function (error, response, body) {
    if (error) console.log('error', error)
  });
};

const sendToTrello = (name, email, phone, message) => {
  const t = new Trello(TRELLO_KEY, TRELLO_TOKEN);
  let desc = `
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}
  `;
  t.post('/1/cards/', {
    idList: TRELLO_LIST_ID,
    name: '***NEW*** ' + name,
    desc: desc
  }, (err) => {
    if (err) console.log(err)

  });
};


export function handler (event, context, callback){
  console.log('called', event);
  const origin = event["headers"]["origin"];
  const amp_source = event["queryStringParameters"]["__amp_source_origin"];
  const parser = new Multipart(event);

  parser.on('field',function(key, value){
    console.log('received field', key, value);
  });
  // parser.on('file',function(file){
  //   //file.headers['content-type']
  //   file.pipe(fs.createWriteStream(__dirname+"/downloads/"+file.filename));
  // })

  parser.on('finish',function(result){
    let fields = result.fields;
    console.log('result.fields', result.fields);
    try {
      sendToSlack(fields.Name, fields.Email, fields.Phone, fields.Message);
      sendToTrello(fields.Name, fields.Email, fields.Phone, fields.Message);
    } catch (e) {
      console.log('e', e);
    }

    let responseBody = {result: "Success."}; // or {errorMessage: error_description}
    let response = {
      "isBase64Encoded": false,
      "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'AMP-Access-Control-Allow-Source-Origin',
        'AMP-Access-Control-Allow-Source-Origin': amp_source
      },
      "statusCode": 200,
      "body": JSON.stringify(responseBody)
    };
    callback(null, response);
  });
}
