import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const encryptionKey = 'secret-key';

const decryptedvendorid = () => {
    const ciphertext = Cookies.get('vendorid');
    if (ciphertext) {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
            const userId = bytes.toString(CryptoJS.enc.Utf8);
            return userId;
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
    return null;
};

export default decryptedvendorid