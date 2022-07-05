export default handleRequest;

const appScriptURL = 'https://script.google.com/macros/s/AKfycbweJCECG9R4bjTq2XoQslwo_2S1s0omm9G1hADmjMsijQIF6QAMeHYARgAAc8mAsDwj/exec';

async function handleRequest(data) {

    const response = await fetch(
        appScriptURL,
        {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'Name': data.Name,
                'Email': data.Email,
                'Message': data.Message
            })
        }
    )

    return response.json();
}

