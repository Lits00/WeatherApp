const userForm = document.getElementById('userForm');
const userInput = document.getElementById('place');
const searchBtn = document.getElementById('searchBtn');

const formatDate = (localtime) => {
    const date = new Date(localtime);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.toLocaleString('en-US', {weekday: 'long'});
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const formatedDate = `${day} | ${month} ${date.getDate()}, ${year} | ${hour}:${minute}`;
    return formatedDate;
}

const loader = () => {
    const parent = document.getElementById('weather');
    parent.innerHTML = '';

    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');

    parent.appendChild(spinner);
}

const generateWeather = (data) => {
    const parent = document.getElementById('weather');
    parent.innerHTML = '';

    const location = document.createElement('h1');
    const date = document.createElement('p');
    const card = document.createElement('div');
    const temp = document.createElement('h2');
    const icon = document.createElement('img');
    const status = document.createElement('p');
    const like = document.createElement('p');
    const condition = document.createElement('div');
    const humid = document.createElement('p');
    const percent = document.createElement('span')
    const wind = document.createElement('p');
    const speed = document.createElement('span');

    location.id = 'location';
    date.id = 'date-time';
    card.id = 'weatherCard';
    temp.id = 'temp';
    icon.id = 'icon';
    status.id = 'status';
    like.id = 'like';
    condition.id = 'condition';
    condition.classList.add('d-flex');
    humid.id = 'humid';
    percent.id = 'percent';
    wind.id = 'wind';
    speed.id = 'speed';

    location.textContent = `${data.location.name}, ${data.location.country}`;
    date.textContent = formatDate(data.location.localtime);
    temp.textContent = `${data.current.temp_c}\u00B0C`
    icon.src = data.current.condition.icon;
    status.textContent = data.current.condition.text;
    like.textContent = `Feels like ${data.current.feelslike_c}\u00B0C`;
    humid.textContent = 'Humidity ';
    percent.textContent = `${data.current.humidity}%`;
    wind.textContent = 'Wind ';
    speed.textContent = `${data.current.wind_kph} km/hr`;

    
    humid.appendChild(percent);
    wind.appendChild(speed);
    condition.append(humid, wind);
    temp.appendChild(icon);
    card.append(temp, status, like, condition);
    parent.append(location, date, card);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const place = userInput.value;
        const apiKey = '68cbc5e6dd544f58afd120120232707';
        loader();
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}`, {mode: 'cors'});
        const data = await response.json(); // parsing raw data to JSON
        generateWeather(data);
        userInput.value = '';
    } catch (error) {
        alert(`Location not found.`);
        userInput.value = '';
    }
}

userForm.addEventListener('submit', handleSubmit)