import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from './index';

const fakePets = [
    {
       "category":"cat",
       "description":"Bon jovi is a Canadian hairless cat, aka sphynx cat. He is very energetic and friendly to strangers",
       "id":"151c7e54-3a89-430d-9866-b245e393e536",
       "image_url":"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F08%2Fsphynx-green-robe-1012208470-2000.jpg",
       "name":"Bon jovi",
       "owner_id":"f1fa9e2b-31be-49d6-ba21-52f9e805c84f"
    },
    {
       "category":"owl",
       "description":"Stairway is an owl which loves to live in the attic. He's normally quiet but he could be extremely ferocious when angry. ;)",
       "id":"6addae3e-a18d-41a1-aa56-f2c764ee8ffd",
       "image_url":"https://i.natgeofe.com/n/9e03dc4c-3d08-439c-a2b2-ec6776f13e81/02-superb-owls-nationalgeographic_2564243.jpg",
       "name":"Stairway",
       "owner_id":"f1fa9e2b-31be-49d6-ba21-52f9e805c84f"
    }
 ]

beforeEach(() => { // if you have an existing `beforeEach` just add the following line to it
  fetchMock.doMock()
})

xit("renders 0 pet data", async () => {
    // Return 0 pets
    jest.spyOn(global, "fetch").mockImplementation(() => {
      Promise.resolve({
        json: () => Promise.resolve([])
      })}
    );
  
    // Use the asynchronous version of act to apply resolved promises
    render(<SearchPage />);
    await waitFor(()=>{
        expect(screen.queryAllByAltText(/petimg/).length).toBe(0);
    });
    
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

xit("renders 2 pet data", async () => {
    // Return 2 pets
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakePets)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    render(<SearchPage />);
    await waitFor(()=>{
        expect(screen.queryAllByAltText(/petimg/).length).toBe(2);
    });
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

it("fetch error", async () => {
    // Rejects fetch
    fetch.mockReject(new Error('fake error message'));

    // Use the asynchronous version of act to apply resolved promises
    render(<SearchPage />);

    let searchbar = screen.getByPlaceholderText(/keyword/);
    let searchbtn = screen.getByRole("button", {name: "search"});

    // Type a existing keyword
    searchbar.value = " ";
    fireEvent.click(searchbtn);
    // Nothing should happen
  
});

it("search with existing keywords", async () => {
  
    fetch.mockResponse(JSON.stringify([fakePets[0]]));

    render(<SearchPage />);

    let cards;
    let searchbar = screen.getByPlaceholderText(/keyword/);
    let searchbtn = screen.getByRole("button", {name: "search"});
    let detailedInformation = "Detailed information";

    // Type a existing keyword
    searchbar.value = "cat";
    fireEvent.click(searchbtn)
    cards = await screen.findAllByAltText(/petimg/);
    expect(cards.length).toBe(1); // Just for now!

    // Test on clicking the searched card
    expect(screen.queryByText(detailedInformation)).toBeNull();
    fireEvent.click(cards[0]);
    expect(screen.getByText(detailedInformation)).toBeInTheDocument();

  });

it("search with empty keywords", async ()=>{

    fetch.mockResponse(JSON.stringify(fakePets));

    render(<SearchPage />);

    let cards;
    let searchbar = screen.getByPlaceholderText(/keyword/);
    let searchbtn = screen.getByRole("button", {name: "search"});
    let detailedInformation = "Detailed information";

    // Type a existing keyword
    searchbar.value = " ";
    fireEvent.click(searchbtn)
    cards = await screen.findAllByAltText(/petimg/);
    expect(cards.length).toBe(2); // Just for now!

    // Test on clicking the searched card
    expect(screen.queryByText(detailedInformation)).toBeNull();

});

it("search with nonexisting keywords", async ()=>{
    
    fetch.mockResponse(JSON.stringify([]));

    render(<SearchPage />);

    let cards;
    let searchbar = screen.getByPlaceholderText(/keyword/);
    let searchbtn = screen.getByRole("button", {name: "search"});
    let detailedInformation = "Detailed information";

    // Type a non-existing keyword
    searchbar.value = "nonsense";
    fireEvent.click(searchbtn)
    await waitFor(()=>{
      expect(screen.queryAllByAltText(/petimg/).length).toBe(0);
    });

    // Test on clicking the searched card
    expect(screen.queryByText(detailedInformation)).toBeNull();
})
