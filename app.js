const teamsInput = document.querySelector('#teamsInput');
const seasonsInput = document.querySelector('#seasonsInput');
const subHeading = document.querySelector('h2');
const activeSubHeading = document.querySelector('.active');
const mainHeading = document.querySelector('#teamHeading');
mainHeading.innerText = teamsInput.innerText;
const team1 = document.querySelector('#team1');
const team2 = document.querySelector('#team2');
const h2hStatsBtn = document.querySelector('#h2hStats');

const statsTable = document.querySelector('#stats-table');
const h2hTable = document.querySelector('#head-to-head-table');

const baseballTeams = [];
let team;
const generateSeasons = (appendTo) => {
    for (let i = 2020; i > 1980; i--) {
        const newSeason = document.createElement('option');
        newSeason.setAttribute('value', i);
        newSeason.innerText = i;
        appendTo.append(newSeason);
    }
}
generateSeasons(seasonsInput);

