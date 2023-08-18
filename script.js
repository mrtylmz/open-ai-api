const openAIBearerToken = '';

document.addEventListener('DOMContentLoaded', () => {
    const chatgptForm = document.getElementById('chatgpt-form');
    const chatgptResult = document.getElementById('chatgpt-result');
    const dalleForm = document.getElementById('dalle-form');
    const dalleResult = document.getElementById('dalle-result');

    function showPleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.remove('d-none');
    }

    function hidePleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.add('d-none');
    }

    if (chatgptForm) {
        chatgptForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = document.getElementById('chatgpt-prompt').value;
            
            showPleaseWait();

            console.log('Murat' +prompt);
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openAIBearerToken}`
                    },
                    // body: JSON.stringify({
                    //     model: "text-davinci-003",
                    //     prompt: prompt,
                    //     max_tokens: 500,
                    //     n: 1,
                    //     stop: "null",
                    //     temperature: 0
                    // })

                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                              "role": "system",
                              "content": "Given the following SQL tables, your job is to write queries given a user’s request.\n\nCREATE TABLE Orders (\n  OrderID int,\n  CustomerID int,\n  OrderDate datetime,\n  OrderTime varchar(8),\n  PRIMARY KEY (OrderID)\n);\n\nCREATE TABLE OrderDetails (\n  OrderDetailID int,\n  OrderID int,\n  ProductID int,\n  Quantity int,\n  PRIMARY KEY (OrderDetailID)\n);\n\nCREATE TABLE Products (\n  ProductID int,\n  ProductName varchar(50),\n  Category varchar(50),\n  UnitPrice decimal(10, 2),\n  Stock int,\n  PRIMARY KEY (ProductID)\n);\n\nCREATE TABLE Customers (\n  CustomerID int,\n  FirstName varchar(50),\n  LastName varchar(50),\n  Email varchar(100),\n  Phone varchar(20),\n  PRIMARY KEY (CustomerID)\n);"
                            },
                            {
                              "role": "user",
                              "content": prompt
                            }
                          ],
                        temperature: 0,
                        
                        max_tokens: 1024,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0
                    })
                });
                
                const data = await response.json();
                console.log("responseee" +data.choices[0].message.content)
                chatgptResult.innerText = data.choices[0].message.content;
            } catch (error) {
                console.error(error);
                chatgptResult.innerText = 'Error fetching results';
            }

            hidePleaseWait();
        });
    }

});

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    let activeNavItem;

    switch (currentPage) {
        case 'index.html':
            activeNavItem = document.getElementById('nav-chatgpt');
            break;
        case 'dalle.html':
            activeNavItem = document.getElementById('nav-dalle');
            break;
        default:
            // No active nav item for index.html
            return;
    }

    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavItem();
    // The rest of your existing code...
});
