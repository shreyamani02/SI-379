let imageCounter = 0;
let timerId = false;
let thumbnails = document.getElementById('thumbnails');
let previousNode = 0;

getUMEventsWithImages((eventData) => {
    console.log(eventData);

    thumbnailConsole(eventData);
    imageInfo(imageCounter, eventData);
});
    
function imageInfo(index, eventData){

    if (previousNode != 0){
        previousNode.classList.remove('selected');
    }

    thumbnails.childNodes[index].classList.add('selected');

    let img = document.getElementById('selected-image');
    img.setAttribute('src', eventData[index]['image_url']);

    let title = document.getElementById('selected-title');
    title.innerText = eventData[index]['event_title']
    title.setAttribute('href', eventData[index]['permalink']);

    let date = document.getElementById('selected-date');
    date.innerText = getReadableTime(eventData[index]['datetime_start']);

    let para = document.getElementById('selected-description');
    para.innerText = eventData[index]['description'];  
    
    clearTimeout(timerId);

    previousNode = thumbnails.childNodes[index];

    timerId = setTimeout(() => { 
        index += 1;
        if (index === eventData.length){
            index = 0;
        }
        imageInfo(index, eventData);
        console.log("Toggle because of timeout"); 
    }, 10000);
}

function thumbnailConsole(eventData){
    for (let i = 0; i < eventData.length; i++){
        let image = document.createElement('img');
        image.setAttribute('src', eventData[i]['styled_images']['event_thumb']);

        image.addEventListener("click", () => {
            imageInfo(i, eventData);
            console.log("Toggle because of click");
        });

        thumbnails.appendChild(image);
    }
}