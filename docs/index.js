function poll_registration_status() {
    const name_input = document.getElementById("name");
    const register_button = document.getElementById("register-button")

    register_button.disabled = name_input.value.length == 0;
}

function track_view() {
    fetch(
        "https://drop1.garrepi.dev/track-view"
        , {
              method: 'POST',
              credentials: 'include',
                headers: {
                    Origin: "https://garrepi.dev/btsb3",
                    "Content-Type": "text/plain",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type, Accept"
                }
        }
    )
    .then(res => res.json())
    .then(() => {
        fetch_view_count();
    })
    .catch(error => {
        console.log('error tracking view', error);
    })

}

function fetch_view_count() {
    fetch("https://drop1.garrepi.dev/view-count")
        .then(res => res.json())
        .then(count => {
            const guestCounter = document.getElementById("view-count");
            guestCounter.textContent = count + " views";
        })
        .catch(err => {
            const guestCounter = document.getElementById("view-count");
            guestCounter.textContent = "Error fetching view count";
            console.log('view count: ', err);
        });
}

function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const params = new URLSearchParams({
        name,
        email
    });

    fetch(
        "https://drop1.garrepi.dev/register?" + params,
        {
              method: 'POST',
              credentials: 'include',
                headers: {
                    Origin: "https://garrepi.dev/btsb3",
                    "Content-Type": "text/plain",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type, Accept"
                }
        }
    )
    .then(res => res.json())
    .then(res => {
        /*
            1. `#input-pane` remove children
            2. add success text and calendar invite
            3. update guests
         */
        const p = document.createElement("p");
        const t = document.createTextNode(res.result);
        p.appendChild(t);
        document.getElementById("input-pane").replaceChildren(...[p]);
    })
    .catch(error => {
        console.log('error ', error);
        const p = document.createElement("p");
        const t = document.createTextNode(error);
        p.appendChild(t);
        document.getElementById("input-pane").replaceChildren(...[p]);
    })
    .finally(() => {
        location.href = "./res/event.ics"
    });
}

track_view();
fetch_view_count();
poll_registration_status();
