import { generateKeyPair, encrypt, decrypt } from "./rsaUtils";
import { displayResult } from "../../../../encryption/shared/encryptions";
import { initializeAndShowWidget, hideWidget } from "../../../../core/utils/widgetUtils";


export function showRsaCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="rsaCipherPopup" class="popup">
        <h3>RSA Encryption</h3>
        <p>Do you have a key pair?</p>
        <div class="button-container">
            <button id="rsaYesButton">Yes</button>
            <button id="rsaNoButton">No</button>
            <button id="rsaInfoButton">Info</button>
        </div>
      </div>
      <div id="rsaInfoPopup" class="popup" style="display: none;">
        <h3>RSA Cipher</h3>
        <p>RSA (Rivest-Shamir-Adleman) is a widely used public-key cryptosystem for secure data transmission.</p>
        <p>It relies on the computational difficulty of factoring large integers, making it secure for encryption and digital signatures.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)" target="_blank">Wikipedia page</a>.</p>
        <button id="rsaCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('rsaYesButton')?.addEventListener('click', showEncryptionDecryptionOptions);
    document.getElementById('rsaNoButton')?.addEventListener('click', showKeyPairGeneration);
    document.getElementById('rsaInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('rsaInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
        initializeAndShowWidget();

    });
    document.getElementById('rsaCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('rsaInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
        hideWidget();
    });
}

function showEncryptionDecryptionOptions() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
       <div id="rsaCipherPopup" class="popup">
    <h3>RSA Encryption</h3>
    <label for="rsaInput">Enter text:</label>
    <input type="text" id="rsaInput" placeholder="Enter text here">
    <label for="rsaPublicKey">Public Key:</label>
    <textarea id="rsaPublicKey" placeholder="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"></textarea>
    <label for="rsaPrivateKey">Private Key:</label>
    <textarea id="rsaPrivateKey" placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"></textarea>
    <div class="button-container">
        <button id="rsaEncryptButton">Encrypt</button>
        <button id="rsaDecryptButton">Decrypt</button>
        <button id="rsaBackButton">Back</button>
    </div>
  </div>
`;
    inputBar.style.display = 'block';

    document.getElementById('rsaBackButton')?.addEventListener('click', showKeyPairGeneration);
    document.getElementById('rsaEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('rsaDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
}

function showKeyPairGeneration() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="rsaCipherPopup" class="popup">
        <h3>RSA Encryption</h3>
        <button id="rsaGenerateKeysButton">Generate Keys</button>
        <label for="rsaPublicKey">Public Key:</label>
        <textarea id="rsaPublicKey" readonly></textarea>
        <button id="savePublicKeyButton">💾</button>
        <label for="rsaPrivateKey">Private Key:</label>
        <textarea id="rsaPrivateKey" readonly></textarea>
        <button id="savePrivateKeyButton">💾</button>
        <button id="rsaContinueButton" style="display: none;">Continue</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('rsaGenerateKeysButton')?.addEventListener('click', handleGenerateKeysButtonClick);
    document.getElementById('rsaContinueButton')?.addEventListener('click', showEncryptionDecryptionOptions);
    document.getElementById('savePublicKeyButton')?.addEventListener('click', () => saveKey('rsaPublicKey', 'public_key.txt'));
    document.getElementById('savePrivateKeyButton')?.addEventListener('click', () => saveKey('rsaPrivateKey', 'private_key.txt'));
}

function handleGenerateKeysButtonClick() {
    const { publicKey, privateKey } = generateKeyPair();
    (document.getElementById('rsaPublicKey') as HTMLTextAreaElement).value = publicKey;
    (document.getElementById('rsaPrivateKey') as HTMLTextAreaElement).value = privateKey;

    const continueButton = document.getElementById('rsaContinueButton') as HTMLButtonElement;
    continueButton.style.display = 'block';
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('rsaInput') as HTMLInputElement;
    const publicKeyElement = document.getElementById('rsaPublicKey') as HTMLTextAreaElement;
    const inputText = inputElement.value;
    const publicKey = publicKeyElement.value;

    if (inputText.length === 0) {
        alert('Please enter a message to encrypt.');
        return;
    }

    if (publicKey.length === 0) {
        alert('Please enter a public key.');
        return;
    }

    try {
        const encryptedText = encrypt(publicKey, inputText);
        displayResult('RSA Encryption', inputText, encryptedText);
    } catch (error) {
        alert('Encryption failed. Please check the public key and try again.');
    }

    const popup = document.getElementById('rsaCipherPopup') as HTMLElement;
    if (popup) {
        popup.remove();
    }

    const menuElement = document.getElementById('menu') as HTMLElement;
    if (menuElement) {
        menuElement.style.display = 'block';
    }

    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;
    if (computerScreenElement) {
        computerScreenElement.style.display = 'block';
    }
}

function handleDecryptButtonClick() {
    const inputElement = document.getElementById('rsaInput') as HTMLInputElement;
    const privateKeyElement = document.getElementById('rsaPrivateKey') as HTMLTextAreaElement;
    const inputText = inputElement.value;
    const privateKey = privateKeyElement.value;

    if (inputText.length === 0) {
        alert('Please enter a message to decrypt.');
        return;
    }

    if (privateKey.length === 0) {
        alert('Please enter a private key.');
        return;
    }

    try {
        const decryptedText = decrypt(privateKey, inputText);
        displayResult('RSA Decryption', inputText, decryptedText);
    } catch (error) {
        alert('Decryption failed. Please check the private key and try again.');
    }

    const popup = document.getElementById('rsaCipherPopup') as HTMLElement;
    if (popup) {
        popup.remove();
    }

    const menuElement = document.getElementById('menu') as HTMLElement;
    if (menuElement) {
        menuElement.style.display = 'block';
    }

    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;
    if (computerScreenElement) {
        computerScreenElement.style.display = 'block';
    }
}

function saveKey(elementId: string, filename: string) {
    const element = document.getElementById(elementId) as HTMLTextAreaElement;
    const text = element.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
}

export { generateKeyPair, encrypt, decrypt };