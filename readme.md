**Table of Contents**

[TOCM]

[TOC]

## Features

- RESTful API
- Access token with cookie
- Runtime error handler middleware

## blog.aogung.com API

Source code untuk API untuk kebutuhan blog pada website [Blog Pribadi Saya](https://blog.aogung.com "Blog Pribady Saya").

## Teknologi

Berikut adalah teknologi utama yang digunakan untun RESTful API ini

| Nama    | Versi       |
| ------- | ----------- |
| NodeJs  | 20.17.0 LTS |
| express | ^4.19.2     |
| tsc     | 5.6.2       |
| ts-node | 10.9.2      |
| prisma  | ^5.19.1     |

## Penggunaan

Untuk penggunaannya sangat simple sekali. Setelah clone repo ini, pastikan project berhasil berlajan secara lokal dengan command `npm run dev`.

Jika server sudah berhasil berjalan secara lokal, build menggunakan command `npx tsc`. Pastikan sebelumnya sudah menginstall `typescript` secara global untuk kebutuhan kompilasi.

File hasil build akan ditempatkan di direktori `./build/`.

Terakhir, coba jalankan hasil build dengan command `npm run start` atau bisa juga langsung `node build/app.js`.

## Deploy

Untuk deployment hanya perlu folder hasil build, package.json, dan skema prisma.  
Disarankan menggunakan yarn untuk package manager.

## Penutup

Jika menemukan bug, kendala, atau memiliki ide untuk berkontribusi, saya sangat terbuka dengan hal tersebut. Gunakan issue atau kontak saya secara langsung untuk berkomunikasi.

\#ProCipok _(Programmer Cipocok) heheh..._
