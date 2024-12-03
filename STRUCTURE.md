# Projektstruktur von MatrixCipher

## Verzeichnisstruktur

### public/
- **audio/**
  - `matrix-sound.mp3`: Soundeffekt für die Matrix-Animation.

### src/

#### components/
- **base/**
  - `BaseEncryptionPopup.ts`: Basiskomponente für Verschlüsselungspopups.

#### core/
- **animation/**
  - `animation.ts`: Allgemeine Animationslogik.
  - `matrix_rain.ts`: Implementierung der Matrix-Regen-Animation.
- **audio/**
  - `matrixAudio.ts`: Steuerung der Audiowiedergabe für Matrix-Soundeffekte.
- **base/**
  - `_base.scss`: Basisstile für die Anwendung.
- **utils/**
  - `_variables.scss`: SCSS-Variablen für wiederverwendbare Stile.
  - `widgetUtils.ts`: Hilfsfunktionen für UI-Komponenten.

#### encryption/
- **algorithms/**
  - **asymmetric/rsa/**
    - `rsaCipher.ts`: Implementierung des RSA-Verschlüsselungsalgorithmus.
    - `rsaUtils.ts`: Hilfsfunktionen für RSA-Verschlüsselung.
  - **hash/**
    - `ripemd160Cipher.ts`: Implementierung des RIPEMD-160-Hashalgorithmus.
    - `sha256Cipher.ts`: Implementierung des SHA-256-Hashalgorithmus.
  - **symmetric/**
    - **aes/**
      - `aesCipher.ts`: Implementierung des AES-Verschlüsselungsalgorithmus.
    - **blowfish/**
      - `blowfishCipher.ts`: Implementierung des Blowfish-Verschlüsselungsalgorithmus.
    - **caesar/**
      - `CaesarPopup.ts`: Popup-Komponente für die Caesar-Verschlüsselung.
      - `caesarCipher.ts`: Implementierung des Caesar-Verschlüsselungsalgorithmus.
    - **vigenere/**
      - `vigenereCipher.ts`: Implementierung des Vigenère-Verschlüsselungsalgorithmus.
    - **xor/**
      - `xorCipher.ts`: Implementierung des XOR-Verschlüsselungsalgorithmus.
- **shared/**
  - `encryptions.ts`: Gemeinsame Funktionen und Typen für Verschlüsselungen.

#### styles/
- **components/**
  - `_encryption-popup.scss`: Stile für Verschlüsselungspopups.
  - **ciphers/**
    - `_caesar.scss`: Spezifische Stile für die Caesar-Verschlüsselung.
    - `_vigenere.scss`: Spezifische Stile für die Vigenère-Verschlüsselung.
    - **shared/**
  - **menu/**
    - `_menu.scss`: Stile für das Hauptmenü.
- **core/**
  - `_inputBar.scss`: Stile für die Eingabeleiste.
  - `_layout.scss`: Layoutstile für die Anwendung.
- `style.scss`: Hauptstylesheet der Anwendung.

Diese Struktur bietet eine klare Trennung der verschiedenen Komponenten und Funktionen, die für die Implementierung der MatrixCipher-Anwendung erforderlich sind.
