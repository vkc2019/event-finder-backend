const rp = require('request-promise');
const cheerio = require('cheerio');

async function scrapWebPage(url){
  const options = {
      //  url :'https://www.viagogo.com/in/Sports-Tickets/Cricket/England-vs-India-Cricket-Tickets',
      //  url : 'https://www.viagogo.com/in/Theater-Tickets/Readings/Suzanne-Grieger-Langer-Tickets',
      url,
      transform:body=>cheerio.load(body)
  }
  const $ = await rp(options);
  
    const ev = $('div.w100.p0.el-table > a > div')  
    const eventList = [];
    ev.each((i,el) => {
        const $element = $(el)
        const $time_info = $element.find('div > div > div > time')
        const $eventDate = $time_info.find('div > span.h.m.s-l').text();
        const $eventTime = $time_info.find('div > span.vmid').text();
        const $match_info = $element.find('div.el-column-info.uum.ins > div')
        const $event_title = $match_info.find('span > span.camo.bk').text();
        // console.log($event_title.trim())
        const $event_capacity = $match_info.find('div > span.vmid').text();
        // console.log($event_capacity.trim())
        const $message_info = $element.find('div.w15.txtc.uum.ins.rel.messages-div > div > div > span.js-shared-message').text()
        // console.log($message_info.trim())
        eventList.push({
            "title": $event_title.trim(),
            "capity": $event_capacity.trim(),
            "eventTime": $eventTime,
            "eventDate": $eventDate,
            "message": $message_info.trim()
        })
    });
    console.log(eventList)
    return eventList;

}


module.exports ={
  scrapWebPage
}