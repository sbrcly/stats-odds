class Table {
    constructor(table, teamsInput, subHeading, team1, team2, h2hStatsBtn, vs, h2hTable) {
        this.table = table,
        this.teamsInput = teamsInput,
        this.subHeading = subHeading,
        this.team1 = team1,
        this.team2 = team2,
        this.h2hStatsBtn = h2hStatsBtn,
        this.vs = vs,
        this.h2hTable = h2hTable

        this.teamsInput.addEventListener('change', (e) => {
            const selectedTeam = e.target.value;
            for (let item of baseballTeams) {
                if (item.name === selectedTeam) team = item.id;
            }   
            this.fetchTeamDetails('https://api-baseball.p.rapidapi.com/teams/statistics',
                '4d4e466a06msh322b9c94c642a3dp1ba99cjsn49b0f9408588', team);
            this.addH2HTeam(e);
        });
        subHeading.addEventListener('click', (e) => {
            this.resetTable(e)
        });

        this.h2hStatsBtn.addEventListener('click', this.getH2HIds);

        this.fetchTeams('https://api-baseball.p.rapidapi.com/teams', '4d4e466a06msh322b9c94c642a3dp1ba99cjsn49b0f9408588');
        this.displayGameHeading();
    }
    fetchTeams = async (url, apiKey) => {
        // GET BASEBALL TEAMS
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-host': 'api-baseball.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            },
            params: {
                league: '1', 
                season: '2020'
            }
        })
        .then((response) => {
            // ADD TEAMS TO TEAMS INPUT
            this.teamsData = response.data.response;
            for (let team of this.teamsData) {
                baseballTeams.push(team);
            }
            for (let team of baseballTeams) {
                const newTeam = document.createElement('option');
                newTeam.classList.add('team');
                newTeam.id = team.name;
                newTeam.innerText = team.name;
                this.teamsInput.append(newTeam);
            }
        })
        .catch((e) => {
            console.log(e);
        })
    }
    fetchTeamDetails = async (url, apiKey, team) => {
        //GET DEATAILS OF SELECTED TEAM
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-host': 'api-baseball.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            },
            params: {
                league: '1', 
                season: '2020', 
                team: team
            }
        })
        .then((response) => {
                const {games, team} = response.data.response;
                this.displayTeamStats(games, team);
        })
        .catch((e) => {
            console.log(e);
        })
    }
    fetchH2HStats = async (url, apiKey, h2hTeam1, h2hTeam2) => {
        //GET DEATAILS OF SELECTED TEAM
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-host': 'api-baseball.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            },
            params: {
                h2h: `${h2hTeam1}-${h2hTeam2}`
            }
        })
        .then((response) => {
            const data = response.data.response;
            this.displayH2HStats(data);
        })
        .catch((e) => {
            console.log(e);
        })
    }
    displayGameHeading = () => {
        const tableHeading = document.createElement('tr');
        tableHeading.classList.add('table-heading');
        const teamName = document.createElement('td');
        teamName.innerText = 'Team';
        const statsSeason = document.createElement('td');
        statsSeason.innerText = 'Season';
        const gamesPlayed = document.createElement('td');
        gamesPlayed.innerText = 'GP';
        const homeGames = document.createElement('td');
        homeGames.innerText = 'H';
        const awayGames = document.createElement('td');
        awayGames.innerText = 'A';
        const totalWins = document.createElement('td');
        totalWins.innerText = 'W';
        const homeWins = document.createElement('td');
        homeWins.innerText = 'HW';
        const homeWinPerc = document.createElement('td');
        homeWinPerc.innerText = 'HW%';
        const awayWins = document.createElement('td');
        awayWins.innerText = 'AW';
        const awayWinPerc = document.createElement('td');
        awayWinPerc.innerText = 'AW%';
        const totalWinPerc = document.createElement('td');
        totalWinPerc.innerText = 'TW%';
        const totalLosses = document.createElement('td');
        totalLosses.innerText = 'L'
        const homeLosses = document.createElement('td');
        homeLosses.innerText = 'HL';
        const homeLossPerc = document.createElement('td');
        homeLossPerc.innerText = 'HL%';
        const awayLosses = document.createElement('td');
        awayLosses.innerText = 'AL';
        const awayLossPerc = document.createElement('td');
        awayLossPerc.innerText = 'AL%';
        const totalLossPerc = document.createElement('td');
        totalLossPerc.innerText = 'TL%';
        tableHeading.append(teamName, statsSeason, gamesPlayed, homeGames, awayGames, totalWins, homeWins, homeWinPerc, awayWins, awayWinPerc, totalWinPerc, totalLosses, homeLosses, homeLossPerc, awayLosses, awayLossPerc, totalLossPerc);
        this.table.append(tableHeading);
    }
    displayTeamStats = (games, team) => {
        const newRow = document.createElement('tr');
        newRow.classList.add('teamRow');
        const teamName2 = document.createElement('td');
        teamName2.innerText = team.name;
        const statsSeason2 = document.createElement('td');
        statsSeason2.innerText = seasonsInput.value;
        statsSeason2.classList.add('end-of-section');
        const gamesPlayed2 = document.createElement('td');
        gamesPlayed2.innerText = games.played.all;
        const homeGames2 = document.createElement('td');
        homeGames2.innerText = games.played.home;
        const awayGames2 = document.createElement('td');
        awayGames2.innerText = games.played.away;
        awayGames2.classList.add('end-of-section');
        const totalWins2 = document.createElement('td');
        totalWins2.innerText = games.wins.all.total;
        const homeWins2 = document.createElement('td');
        homeWins2.innerText = games.wins.home.total;
        const homeWinPerc2 = document.createElement('td');
        homeWinPerc2.innerText = games.wins.home.percentage;
        const awayWins2 = document.createElement('td');
        awayWins2.innerText = games.wins.away.total;
        const awayWinPerc2 = document.createElement('td');
        awayWinPerc2.innerText = games.wins.away.percentage;
        const totalWinPerc2 = document.createElement('td');
        totalWinPerc2.innerText = games.wins.all.percentage;
        totalWinPerc2.classList.add('end-of-section');
        const totalLosses2 = document.createElement('td');
        totalLosses2.innerText = games.loses.all.total;
        const homeLosses2 = document.createElement('td');
        homeLosses2.innerText = games.loses.home.total;
        const homeLossPerc2 = document.createElement('td');
        homeLossPerc2.innerText = games.loses.home.percentage;
        const awayLosses2 = document.createElement('td');
        awayLosses2.innerText = games.loses.away.total;
        const awayLossPerc2 = document.createElement('td');
        awayLossPerc2.innerText = games.loses.away.percentage;
        const totalLossPerc2 = document.createElement('td');
        totalLossPerc2.innerText = games.loses.all.percentage;
        newRow.append(teamName2, statsSeason2, gamesPlayed2, homeGames2, awayGames2, totalWins2, homeWins2, homeWinPerc2, awayWins2, awayWinPerc2, totalWinPerc2, totalLosses2, homeLosses2, homeLossPerc2, awayLosses2, awayLossPerc2, totalLossPerc2);
        this.table.append(newRow);
    }
    displayH2HStats = (data) => {
        const h2hHeader = document.createElement('tr');
        const matchupHeader = document.createElement('td');
        matchupHeader.classList.add('matchup');
        matchupHeader.innerText = 'Matchup';
        const seasonHeader = document.createElement('td');
        seasonHeader.innerText = 'Season';
        const dateHeader = document.createElement('td');
        dateHeader.innerText = 'Date';
        const scoreHeader = document.createElement('td');
        scoreHeader.innerText = 'Score';
        h2hHeader.append(matchupHeader, seasonHeader, dateHeader, scoreHeader);
        this.h2hTable.append(h2hHeader);

        for (let item of data) {
            const newGame = document.createElement('tr');
            newGame.classList.add('h2h-game');
            newGame.id = item.id;
            const matchup = document.createElement('td');
            matchup.classList.add('matchup');
            matchup.innerText = `${item.teams.away.name} @ ${item.teams.home.name}`;
            const h2hSeason = document.createElement('td');
            h2hSeason.innerText = item.league.season;
            const date = document.createElement('td');
            date.innerText = item.date.split('T')[0];
            const score = document.createElement('td');
            score.innerText = `${item.scores.away.total} - ${item.scores.home.total}`;
            newGame.append(matchup, h2hSeason, date, score);
            this.h2hTable.append(newGame);
            this.displayExtraStats(item);
        }

    }
    displayExtraStats = (item) => {
        const gameExtras = document.createElement('tr');
        gameExtras.classList.add('innings');
        const inningsTeams = document.createElement('td');
        inningsTeams.classList.add('sub-table');
        inningsTeams.innerHTML = `<span>${item.teams.away.name}</span> <span>${item.teams.home.name}</span>`;
        gameExtras.append(inningsTeams);
        for (let i = 1; i < 10; i++) {
            const newInning = document.createElement('td');
            newInning.classList.add('sub-table');
            if (item.scores.home.innings[i] == null && item.scores.away.innings[i] == null) {
                newInning.innerHTML = `<span>0</span><span>0</span>`;
            }   else if (item.scores.home.innings[i] == null) {
                newInning.innerHTML = `<span>${item.scores.away.innings[i]}</span><span>0</span>`;
            }   else if (item.scores.away.innings[i] == null) {
                    newInning.innerHTML = `<span>0</span><span>${item.scores.home.innings[i]}</span>`;
            }   else {
                newInning.innerHTML = `<span>${item.scores.away.innings[i]}</span><span>${item.scores.home.innings[i]}</span>`;
            }
            gameExtras.append(newInning);
        }

        const hits = document.createElement('td');
        hits.id = 'hits';
        hits.classList.add('sub-table');
        hits.innerHTML = `<span>Hits: </span> <span>Hits: </span>`;
        gameExtras.append(hits);
        const hitsValue = document.createElement('td');
        hitsValue.classList.add('sub-table');
        hitsValue.innerHTML = `<span>${item.scores.away.hits}</span><span>${item.scores.home.hits}</span>`;
        gameExtras.append(hitsValue);

        const errors = document.createElement('td');
        errors.id = 'errors';
        errors.classList.add('sub-table');
        errors.innerHTML = `<span>Errors: </span> <span>Errors: </span>`;
        gameExtras.append(errors);
        const errorsValue = document.createElement('td');
        errorsValue.classList.add('sub-table');
        errorsValue.innerHTML = `<span>${item.scores.away.errors}</span><span>${item.scores.home.errors}</span>`;
        gameExtras.append(errorsValue);
        this.h2hTable.append(gameExtras);
    }
    addH2HTeam = (e) => {
        if (this.team1.innerText === '') {
            this.team1.innerText = e.target.value;
            this.vs.style.display = 'block';
        }   else if (this.team2.innerText === '') {
            this.team2.innerText = e.target.value;
            this.h2hStatsBtn.style.display = 'block';
        }
    }
    getH2HIds = () => {
        let h2hTeam1;
        let h2hTeam2;
        for (let team of baseballTeams) {
            if (this.team1.innerText === team.name) {
                h2hTeam1 = team.id;
            }
            if (this.team2.innerText === team.name) {
                h2hTeam2 = team.id;
            }
        }
        this.fetchH2HStats('https://api-baseball.p.rapidapi.com/games/h2h', '4d4e466a06msh322b9c94c642a3dp1ba99cjsn49b0f9408588', h2hTeam1, h2hTeam2);
    }
    resetTable = () => {
        const rows = document.querySelectorAll('tr');
        for (let row of rows) {
            row.remove();
        }
        this.team1.innerText = '';
        this.team2.innerText = '';
        this.vs.style.display = 'none';
        this.h2hStatsBtn.style.display = 'none';
    }
}

const table1 = new Table(statsTable, teamsInput, subHeading, team1, team2, h2hStatsBtn, vs, h2hTable);