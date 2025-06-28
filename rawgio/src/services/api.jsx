import axios from 'axios';




export const rawgAPICall = (id) => {
// const [dataState, setDataState] = useState([]);
const APIKey = '6327df6cc86546fb9e6d671c19a655fb';
const site = 'https://api.rawg.io/api/games/' + id;
// const { id = '3498' } = props || {}; 
  // Fetch Data from API
 
async function fetchData() {
    const response = await axios.get(site , {
          params: {
            key: APIKey
          }
        });
        const data = response.data;
        console.log("Fetched data:", data); // Log fetched data
        if (data === undefined || data.length === 0) {
          console.log("No data found for the given parameters of ID = " + site);
        }
        else {
          console.log("Data fetched successfullyfor the given parameters of ID = " + site);
        }
        
        console.log("Here is the data:", data);
        return data; // Return the fetched data
    }


    return fetchData();

    
  }





  


export default rawgAPICall;