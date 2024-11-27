const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const targetSection = link.getAttribute('data-target');

        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('d-none');
        });

        document.getElementById(targetSection).classList.remove('d-none');

        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});


const API_KEY = 'a05a7793239b4998f293d3f3a3c7ecbb';

//get top ARTIST list
const topartist = [];
const playcount = [];
const ctx = document.getElementById('topArtistsChart');
fetch(`⁠ https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json`⁠)
    .then(res => res.json())
    .then(data => {

        data.artists.artist.forEach(artist => {
            topartist.push(artist.name);
            playcount.push(parseInt(artist.playcount));

        })

        const ctx = document.getElementById('topArtistsChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topartist,
                datasets: [{
                    label: '# of Votes',
                    data: playcount,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


    });




// get top tracks
const chart2 = document.getElementById('topListenTracks');
const toptracks = [];
const listners = [];
fetch(⁠ `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json `⁠)
    .then(res => res.json())
    .then(data => {

        data.tracks.track.forEach(track => {
            toptracks.push(track.name);
            listners.push(parseInt(track.listeners));
        });

        const ctx = document.getElementById('topTracksChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: toptracks,
                datasets: [{
                    label: '# of Votes',
                    data: listners,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })

// get genere
const genere = [];
const taggings = [];
fetch(`⁠ https://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY}&format=json `⁠)
    .then(res => res.json())
    .then(data => {
        data.tags.tag.forEach(tag => {
            genere.push(tag.name);
            taggings.push(parseInt(tag.taggings));
        });


        const ctx = document.getElementById('genereChart');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: genere,
                datasets: [{
                    label: '# of Votes',
                    data: taggings,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })


// weekly chart list
function getData() {
    const user = document.getElementById('username').value;
    const cardContainer = document.getElementById('cardContainer');

    fetch(⁠`https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${user}&api_key=${API_KEY}&format=json ⁠`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.weeklytrackchart.track.forEach(element => {
                const trackname = element.name;                
                const artistname = element.artist['#text'];
                const imageUrl = element.image.find(img => img.size === 'small')?.['#text'] || 'placeholder.jpg';

                const card = `
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${imageUrl}" class="card-img-top" alt="${trackname}">
                                <div class="card-body">
                                    <h5 class="card-title">${trackname}</h5>
                                    <p class="card-text">Artist: ${artistname}</p>
                                </div>
                            </div>
                        </div>`;
                cardContainer.innerHTML += card;
            });
        });

}