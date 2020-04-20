let users = JSON.parse(localStorage.getItem('users')) || [];
let clients = JSON.parse(localStorage.getItem('clients')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    let LoggedInUser = JSON.parse(opts.body);
                    let responseJson = {};
                    if (LoggedInUser.type === 'facebookLogin') {
                        let userExists = users.filter(user => { return user.username === LoggedInUser.username; }).length;
                        if (!userExists) {
                            users.push(LoggedInUser);
                        }
                        responseJson = {
                            id: LoggedInUser.id,
                            username: LoggedInUser.username,
                            firstName: LoggedInUser.firstName,
                            lastName: LoggedInUser.lastName,
                            token: LoggedInUser.password
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        let filteredUsers = users.filter(user => {
                            return user.username === LoggedInUser.username && user.password === LoggedInUser.password;
                        });
                        if (filteredUsers.length) {
                            let user = filteredUsers[0];
                            responseJson = {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            };
                            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                        } else {
                            reject('Username or password is incorrect');
                        }
                    }
                    return;
                }

                if (url.endsWith('/clients') && opts.method === 'GET') {
                    let currentUser = JSON.parse(localStorage.getItem('user'));
                    if (opts.headers && opts.headers.Authorization === 'Bearer '+ currentUser.token) {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(clients))});
                    } else {
                        reject('Unauthorised');
                    }

                    return;
                }

                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    let newUser = JSON.parse(opts.body);

                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }

                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                if (url.endsWith('/clients/addReservation') && opts.method === 'POST') {
                    let newClient = JSON.parse(opts.body);

                    newClient.id = clients.length ? Math.max(...clients.map(client => client.id)) + 1 : 1;
                    clients.push(newClient);
                    localStorage.setItem('clients', JSON.stringify(clients));

                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                if (url.match(/\/clients\/\d+$/) && opts.method === 'DELETE') {
                    let currentUser = JSON.parse(localStorage.getItem('user'));
                    if (opts.headers && opts.headers.Authorization === 'Bearer '+ currentUser.token) {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < clients.length; i++) {
                            let client = clients[i];
                            if (client.id === id) {
                                clients.splice(i, 1);
                                localStorage.setItem('clients', JSON.stringify(clients));
                                break;
                            }
                        }

                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        reject('Unauthorised');
                    }

                    return;
                }

                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}