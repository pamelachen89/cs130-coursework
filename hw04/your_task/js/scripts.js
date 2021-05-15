const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
   // console.log{

};
  

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    const elem = document.querySelector('#artist');
    elem.innerHTML = "";
    fetch(baseURL + '?type=artist&q=' + term)
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0) {
            const firstArtist = data[0];
            elem.innerHTML += getArtistHTML(firstArtist);
        }
    });
};

const getArtistHTML = (data) => {
    if (!data.image_url) {
        data.image_url = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Flaughingsamurai.com%2Fusability%2Fuser-friendly-error-messages%2F&psig=AOvVaw3aY7eSsh2IRFhlM2_aPAGL&ust=1621130489029000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDL6evLyvACFQAAAAAdAAAAABAP';
    }
    return `<section class="artist-card" id="${data.id}">
        <div>
            <img src="${data.image_url}">
            <h3>${data.name}</h3>
            <div class="footer">
                <a href="${data.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>`;
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};