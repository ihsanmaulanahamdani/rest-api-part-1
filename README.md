# Persiapan Membuat Web Part 1 - Membuat Rest API Node Js Menggunakan Framework Express


## Persiapan sebelum memulai membuat Rest API
Untuk membuka terminal di Vs Code menggunakan shortcut ctrl + `
```
npm init
```
Tekan `enter` sampai terminal berhenti

Untuk menjalankan Rest API yang dibuat agar otomatis restart pada saat terjadi perubahan gunakan `nodemon` untuk menjalankannya
```
npm i -g nodemon
```
p.s kalau sudah pernah menginstall `nodemon`, tidak usah diinstall lagi
## 1. Install `express`
```
npm i express
```
atau
```
npm i express
```
## 2. Inisialisi express
buat file `app.js`, lalu tuliskan syntax dibawah
```javascript
const express = require('express');

const app = express();
```
## 3. Inisialisasi `port`
Untuk port biasanya menggunakan port 3000

p.s untuk port sebenarnya tidak ada aturan khusus, port bisa 4000, 5000 atau 4001 dst
```javascript
const express = require('express');

const port = 3000

const app = express();

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
})
```
jalankan server menggunakan `nodemon`
```
nodemon app.js
```
nah sekarang server sudah connect di link http://localhost:3000 dan bisa dibuka di web
## 4. Mengirimkan data melalui method `GET` dari express
```javascript
const express = require('express');

const port = 3000

const app = express();

app.get('/', function(req, res) {
  res
    .send('Hello World!)
})

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
})
```
sekarang coba buka browser dan masukkan url yang sudah dibuat yaitu http://localhost:3000