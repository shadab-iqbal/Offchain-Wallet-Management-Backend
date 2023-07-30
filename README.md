# Offchain Wallet Management

Offchain Wallet Management is a web application that allows users to easily sign up or sign in using their email and password. The user interface provides a seamless experience similar to Web2 applications. However, behind the scenes, a wallet is generated for each user, and their data is mapped to the corresponding wallet address.

Transactions performed by the user are securely recorded on the blockchain. These transactions are signed by the admin wallet in the backend, ensuring the integrity and security of the user's interactions. The user is shielded from the complexities of blockchain operations, enabling a user-friendly trading experience.

For interacting with the app using a User Interface, please clone the [Offchain Wallet Management Frontend.](https://github.com/shadab-iqbal/Offchain-Wallet-Management-Frontend)

## Features

- User-friendly sign-up and sign-in process using email and password.
- Generation of a dedicated wallet address for each user.
- Mapping of user data to the associated wallet address.
- Trading of fiat tokens with dollars within the platform.
- Buy and sell fiat tokens using the provided trading interface.
- Option to withdraw tokens from the platform to the user's own wallet address or any other desired wallet address.
- Export and import private keys for integration with external wallets such as MetaMask and WalletConnect.

## Getting Started

1. CREATE a .env file on root folder and COPY the content from .env.example
2. CREATE a database named offchain_wallet in your postgres server
3. UPDATE database host, port number, username and password in the .env file
4. RUN yarn to install all dependencies
5. RUN yarn start:dev to start the nest.js server
6. RUN yarn migration:run to create the database tables

## API Endpoints

### Authentication

#### Sign up

```
POST /api/auth/signup
```

Creates a new user account.

_Request body:_

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Log in

```
POST /api/auth/login
```

Log in to an existing user account.

_Request body:_

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

This api call will return a JWT access or bearer token.

### Trading

#### Buy tokens

```
POST /api/trade/buy
```

Buy fiat tokens using USD.

_Request body:_

```json
{
  "amount": "100"
}
```

_Header:_

```json
{
  "Authorization": "Bearer abc...xyz"
}
```

#### Sell tokens

```
POST /api/trade/sell
```

Sell fiat tokens for USD.

_Request body:_

```json
{
  "amount": "10"
}
```

The token amount must be sent in ETH unit. It will be converted to wei in the backend.

_Header:_

```json
{
  "Authorization": "Bearer abc...xyz"
}
```

#### Withdraw tokens

```
POST /api/withdraw-tokens
```

Transfer fiat tokens to a wallet.

_Request body:_

```json
{
  "address": "0x123...789",
  "amount": "10"
}
```

_Header:_

```json
{
  "Authorization": "Bearer abc...xyz"
}
```

#### Get Transactions

```
GET /api/transactions
```

View all transactions of logged in user.

_Header:_

```json
{
  "Authorization": "Bearer abc...xyz"
}
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

- Fork the repository.
- Create your branch: git checkout -b feature/my-feature.
- Commit your changes: git commit -am 'Add my feature'.
- Push to the branch: git push origin feature/my-feature.
- Submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Ethereum
- Node.js
- React

## Contact

For any inquiries or support, please contact at shadab.iql@gmail.com
