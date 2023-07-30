const { ethers } = require("ethers");
const CryptoJS = require("crypto-js"); // this one for encryption/decryption

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as argon from "argon2"; // this one for one-way hashing
import * as dotenv from "dotenv";
dotenv.config();

import { User } from "./entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { reserveManagementContract } from "@/ABIs/ReserveManagement";

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  /**
   * Creates a new user in the database.
   * @param {UserDto} dto - The data object containing user information.
   * @returns {Promise<User>} - A Promise that resolves to the created user.
   * @throws {HttpException} - If the user already exists.
   */
  async createOne(dto: UserDto) {
    try {
      const user = this.userRepository.create(dto);
      const wallet = await ethers.Wallet.createRandom();
      user.wallet_address = wallet.address;
      user.private_key = this.encryptPrivateKey(wallet.privateKey, user.password);
      user.password = await argon.hash(user.password);
      const savedOne = await this.userRepository.save(user);
      return savedOne;
    } catch (e) {
      console.log("e printing... ", e);
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }
  }

  /**
   * Retrieves a user from the database by email.
   * @param {string} email - The email of the user.
   * @returns {Promise<User>} - A Promise that resolves to the retrieved user.
   * @throws {HttpException} - If the user is not found.
   */
  async getUserByEmail(email: string) {
    try {
      return this.userRepository.findOneByOrFail({ email });
    } catch (e: any) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Retrieves a user from the database by ID.
   * @param {number} id - The ID of the user.
   * @returns {Promise<User>} - A Promise that resolves to the retrieved user.
   * @throws {HttpException} - If the user is not found.
   */
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  /**
   * Retrieves the wallet address of a user by ID.
   * @param {number} id - The ID of the user.
   * @returns {Promise<string>} - A Promise that resolves to the wallet address.
   * @throws {HttpException} - If the user is not found.
   */
  async getWalletAddressById(id: number): Promise<string> {
    return (await this.userRepository.findOneByOrFail({ id })).wallet_address;
  }

  /**
   * Retrieves the private key of a user by ID.
   * @param {number} id - The ID of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A Promise that resolves to the decrypted private key.
   * @throws {HttpException} - If the user is not found.
   */
  async getPrivateKeyById(id: number, password: string): Promise<string> {
    const encryptedPrivateKey = (await this.userRepository.findOneByOrFail({ id })).private_key;
    return this.decryptPrivateKey(encryptedPrivateKey, password);
  }

  /**
   * Encrypts a private key using AES encryption.
   * @param {string} privateKey - The private key to encrypt.
   * @param {string} encryptionPassword - The password to encrypt private key.
   * @returns {string} - The encrypted private key.
   */
  encryptPrivateKey(privateKey: string, encryptionPassword: string) {
    return CryptoJS.AES.encrypt(privateKey, encryptionPassword).toString();
  }

  /**
   * Decrypts an encrypted private key using AES decryption.
   * @param {string} encryptedPrivateKey - The encrypted private key to decrypt.
   * @param {string} encryptionPassword - The password to decrypt private key.
   * @returns {string} - The decrypted private key.
   */
  decryptPrivateKey(encryptedPrivateKey: string, encryptionPassword: string) {
    return CryptoJS.AES.decrypt(encryptedPrivateKey, encryptionPassword).toString(
      CryptoJS.enc.Utf8
    );
  }

  /**
   * Retrieves the token balance of a user.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<string>} The token balance of the user.
   */
  async getUserTokenBalance(userId) {
    const userAddress = this.getWalletAddressById(userId);
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = provider.getSigner();
    const reserveManagement = new ethers.Contract(
      reserveManagementContract.address,
      reserveManagementContract.abi,
      signer
    );
    const nativeTokenBalance = await reserveManagement.nativeTokenBalances(userAddress);
    return `${(nativeTokenBalance / 1e18).toPrecision(5).toString()} Tokens`;
  }
}
