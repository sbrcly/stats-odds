const americanSports = [
    {
        name: 'NFL',
        key: 'americanfootball_nfl'
    },
    {
        name: 'NCAAF',
        key: 'americanfootball_ncaaf'
    },
    {
        name: 'NCAAM',
        key: 'basketball_ncaab'
    },
    {
        name: 'NHL',
        key: 'icehockey_nhl'
    }
];

const oddsTypes = [
    {
        name: 'American',
        key: 'american'
    },
    {
        name: 'Decimal',
        key: 'decimal'
    }
];

const marketOptions = [
    {
        name: 'Moneyline',
        key: 'h2h'
    },
    {
        name: 'Spread',
        key: 'spreads'
    },
    {
        name: 'Total',
        key: 'totals'
    }
];

const apiKey = '55efa4b4f2a30ef0bf723c15e092df57';
const dataTable = document.querySelector('.odds-table');
const sportSelector = document.querySelector('#sports');
const oddsSelector = document.querySelector('#odds-format');
const marketSelector = document.querySelector('#market');

// Create Options
const createOptions = (options, appendTo) => {
    for (let option of options) {
        const newOption = document.createElement('option');
        newOption.innerText = option.name;
        newOption.setAttribute('value', option.key);
        appendTo.append(newOption);
    };
};
createOptions(americanSports, sportSelector);
createOptions(oddsTypes, oddsSelector);
createOptions(marketOptions, marketSelector);

class OddsTable {
    constructor (apiKey, table, ...selectors) {
        this.apiKey = apiKey;
        this.table = table;
        this.selectors = selectors;

        for (let selector of this.selectors) {
            selector.addEventListener('change', () => {
            if (this.selectors.every(select => select.value !== 'choose')) {
                this.chosenSport = this.selectors[0].value;
                this.chosenOdds = this.selectors[1].value;
                this.chosenMarket = this.selectors[2].value;
                this.fetchOdds();
            }
        });
        }
    };
    fetchOdds = async ({apiKey, chosenSport, chosenOdds, chosenMarket} = this) => {
        this.resetTable();
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${chosenSport}/odds/?${apiKey}&regions=us&${chosenMarket}`, {
            params: {
                sport: chosenSport,
                apiKey: apiKey,
                markets: chosenMarket,
                oddsFormat: chosenOdds
            }
        });
        this.parseOddsResponse(response.data);
    };
    parseOddsResponse = (response) => {
        let games = [];
        for (let item of response) {
                games.push(item);
        }
        this.createTableHead(games);
    };
    createTableHead = (data) => {
        console.log(data);
        const tableHeader = document.createElement('tr');
        const games = document.createElement('td');
        games.innerText = 'Games';
        tableHeader.append(games);
        const books = data[0].bookmakers;
        const bookTitles = [];
        for (let book of books) {
            bookTitles.push(book.title);
        }
        bookTitles.sort();
        for (let title of bookTitles) {
            const newBook = document.createElement('td');
            newBook.innerText = title;
            tableHeader.append(newBook);
        }
        this.table.append(tableHeader);
        this.addGames(data, bookTitles);
    };
    addGames = (data, bookTitles) => {
        for (let item of data) {
            const newGame = document.createElement('tr');
            const teamNames = document.createElement('td');
            teamNames.innerText = `${item.away_team} @ ${item.home_team}`;
            newGame.append(teamNames);
            for (let book of bookTitles) {
                const bookData = document.createElement('td');
                const getBook = item.bookmakers.find(b => b.title === book);
                if (getBook) {
                    if (this.chosenMarket === 'h2h') {
                        bookData.innerText = `${getBook.markets[0].outcomes[1].price} / 
                        ${getBook.markets[0].outcomes[0].price}`;
                    }   else if (this.chosenMarket === 'spreads') {
                        bookData.innerText = `${getBook.markets[0].outcomes[1].point} ${getBook.markets[0].outcomes[1].price} / 
                        ${getBook.markets[0].outcomes[0].point} ${getBook.markets[0].outcomes[0].price}`;
                    }   else {
                        bookData.innerText = `${getBook.markets[0].outcomes[0].point} ${getBook.markets[0].outcomes[0].price} / 
                        ${getBook.markets[0].outcomes[1].point} ${getBook.markets[0].outcomes[1].price}`;
                    }
                    
                }   else {
                    bookData.innerText = 'n/a';
                };
                newGame.append(bookData);
            };
            this.table.append(newGame);
        };
    };
    resetTable = () => {
        this.table.innerHTML = '';
    }
};

const table1 = new OddsTable(apiKey, dataTable, sportSelector, oddsSelector, marketSelector);


