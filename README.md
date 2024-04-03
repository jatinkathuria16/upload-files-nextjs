
# Project Title

A single button dialog that allows you to upload files <=5MB to Vercel's blob storage.
1) Supports multiple uploads
2) Remove uploads
3) Consideration: 5MB===5*1000*1000bytes

Control Flow: 
1. call a third party API (example.com) when the upload begins ✅
2. call a third party (example.com) when the upload succeeds ✅
3. call a third party (example.com) when the upload fails ✅
4. If the file is >5MB please show a modal that rejects ✅
5. After the upload is complete, show a list of links of all uploaded files such that you can download them again.✅
6. Put a pencil icon to each link in the list to rename the file. A modal with Save and Cancel buttons should open for the rename.✅
7. Show a skeleton instead of the list of files when the list is still loading.✅
8. add some fake delay if it loads too fast just to show the effect.✅
10. Put a trash icon next to each link in the list so that you can delete it.✅


Working link: https://upload-files-nextjs-eight.vercel.app/


Knows Issues with vercel deplyments
1. Skeleton loaders works fine on local, sometime do not show up on vercel. 
2. Vercel Blob Out going bandwidth limit. https://github.com/orgs/vercel/discussions/4662

Workaround is to fork and create a new vercel account and a blob store using these commands: 
  







## Demo


![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHlubWdvNDRsd2drNTV4Nng0Y3d1Ynd5cXhldjg1em9pb3J2MDYzYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bLYgcPFEvpgxDZlwQG/giphy.gif)
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
   cd upload-files-nextjs   
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  run dev
```
1. install: sudo npm i -g vercel
2. update:  sudo npm i -g vercel@latest
3. link github with sudo vercel link   
4. create a project, create a store 
5. sudo vercel env pull to develop locally
