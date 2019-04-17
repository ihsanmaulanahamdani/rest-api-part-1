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

const port = 3000;

const app = express();

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port);
});
```
jalankan server menggunakan `nodemon`
```
nodemon app.js
```
nah sekarang server sudah connect di link http://localhost:3000 dan bisa dibuka di web
## 4. Mengirimkan data melalui method `GET` dari express
```javascript
const express = require('express');

const port = 3000;

const app = express();

app.get('/', function(req, res) {
  res
    .send('Hello World!');
})

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
});
```
sekarang coba buka browser dan masukkan url yang sudah dibuat yaitu http://localhost:3000

# Persiapan Membuat Web Part 2 - Menghubungkan Server Dengan Database Mongoose
## 1. Membuat Database Mongodb di https://mlab.com
Registrasi di situs https://mlab.com menggunakan email masing-masing. Kemudian buat database, lalu bua username dan password untuk databasenya.
## 2. Install `mongoose` sebagai penghubung ke server mongodb
```
npm i mongoose
```
## 3. Inisialisasi mongoose dan koneksikan dengan database mlab `(app.js)`
```javascript
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('link di mlab')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 3000;

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success connect to database!')
});

app.get('/', function(req, res) {
  res
    .send('Hello World!');
})

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
});
```
## 4. Buat `Model` Sederhana menggunakan mongoose `(model.js)`
```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: String
}, {
  timestamps: true
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendence;
```
Model sudah bisa digunakan
## 5. Setting agar bisa mendapatkan data dari `req.body` di `app.js`
Install cors sebagai penghubung server dan UI
```
npm i cors
```
Kemudian gunakan cors dengan menggunakan `app.use` dan tambahan setting lainnya
```javascript
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('link di mlab')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 3000;

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success connect to database!')
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res
    .send('Hello World!');
})

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
});
```
## 5. Gunakan `Model Attandance` di `app.js`
```javascript
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('link di mlab')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = 3000;

const Attandance = require('./model.js');

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success connect to database!')
});

app.get('/', function(req, res) {
  Attandance
    .find({})
    .then(data => {
      res
        .json({
          data
        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    })
})

app.post('/create', function(req, res) {
  const person = req.body

  Attandance
    .create({
      name: person.name,
      address: person.address,
      email: person.email,
      phone: person.phone
    })
    .then(data => {
      res
        .json({
          data
        })
    })
    .catch(error => {
      res
        .json({
          error: error.message
        })
    });
})

app.listen(port, function() {
  console.log('Server Ready on http://localhost:' + port)
});
```
Untuk testing input bisa menggunakan aplikasi `Insomnia` sebagai REST client.

Setelah melakukan input di `Insomnia`, buka http://localhost:3000 dan lihat apakah data sudah sesuai dengan apa yang sudah kita input.

Data nantinya akan digunakan untuk `UI (User Interface)`