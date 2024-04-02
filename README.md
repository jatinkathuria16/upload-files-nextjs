
# Project Title

A single button dialog that allows you to upload files <=5MB to Vercel's blob storage.
1) Supports multiple uploads
2) Remove uploads

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


Working link: 


Knows Issues with vercel deplyments
1. Skeleton loaders works fine on local, sometime do not show up on vercel. 
2. Vercel Blob Out going bandwidth limit. https://github.com/orgs/vercel/discussions/4662

Workaround is to fork and create a new vercel account and a blob store using these commands: 
  




## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Demo


<iframe src="https://giphy.com/embed/bLYgcPFEvpgxDZlwQG" width="480" height="312" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bLYgcPFEvpgxDZlwQG">via GIPHY</a></p>
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

install: sudo npm i -g vercel
update:  sudo npm i -g vercel@latest
link github with sudo vercel link   
create a project, create a store 
sudo vercel env pull to develop locally