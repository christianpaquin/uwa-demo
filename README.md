# UWA demo

This repository contains files for a [User-Centric Web Attestation](https://github.com/microsoft/web-attestation-sample) demo, illustrating the [deployment example](https://github.com/microsoft/web-attestation-sample#deployment-example) of that project.

Here are notes on how to self-host the demo on a Windows machine, deploying the `https://commun.ity`, `https://soc.ial`, and `https://human.iam` websites in WSL, and the user's browser extension in Edge/Chrome.

## Setup
1. Install the [UWA browser extension](https://github.com/microsoft/web-attestation-sample/tree/main/browser-extension)
1. Install and deploy two [sample issuer](https://github.com/microsoft/web-attestation-sample/tree/main/sample-issuer) express servers for `https://commun.ity` and `https://human.iam`, using the corresponding `settings.json` in `express_servers` folder
    * Install and build project: `npm ci && npm run build`
    * Setup issuer: `npm run setup-issuer`
1. Install nginx in WSL
1. For each of the 3 websites (referred to here as `example.com`)
    * Generate a TLS cert using openssl
        * Openssl.cnf
	    ```
    	[ req ]
		distinguished_name = req_distinguished_name
				
		[req_distinguished_name]
				
		[ v3_issuer ]
		subjectAltName         = @alt_names
		subjectKeyIdentifier   = hash
		authorityKeyIdentifier = keyid:always
				
		[alt_names]
		DNS.1   = example.com
		DNS.2   = www.example.com
		DNS.3   = uwa.example.com
	    ```			
	    * `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/example.com.key -out /etc/ssl/certs/example.com.crt -subj "/CN=example.com" -config openssl.cnf -extensions v3_issuer`
	    * `cp /etc/ssl/certs/example.com.crt <somewhere in the windows partition>`
	* Install cert
	    * Right-click on the `.crt` file and select "Install Certificate".
	    * In the Certificate Import Wizard, select "Current User" and click "Next".
	    * Select "Place all certificates in the following store".
	    * Click "Browse", select "Trusted Root Certification Authorities", and click "OK".
	    * Click "Next", then "Finish".
    * `sudo mkdir -p /var/www/example.com/html`
	* `sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com`
	* `sudo emacs /etc/nginx/sites-available/example.com`
		```
        	server {
			    
			    listen 443 ssl; # default_server;
			    listen [::]:443 ssl; # default_server;
			    ssl_certificate /etc/ssl/certs/example.com.crt;
			    ssl_certificate_key /etc/ssl/private/example.com.key;
			
			    root /var/www/example.com/html;
			    index index.html;
			
			    server_name example.com;
			
			    location / {
			        try_files $uri $uri/ =404;
			    }
			
			    location /issue {
			        proxy_pass http://localhost:4000; # wherever the express server is
			        proxy_http_version 1.1;
			        proxy_set_header Upgrade $http_upgrade;
			        proxy_set_header Connection 'upgrade';
			        proxy_set_header Host $host;
			        proxy_cache_bypass $http_upgrade;
			    }
			}
		```	
	* `sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/`
	* `sudo nginx -t`
	* `sudo service nginx start` or `sudo service nginx reload`
	* Update hosts (`C:\Windows\System32\drivers\etc\hosts`): 
        * `127.0.0.1 example.com`


## Run demo
1. Launch nginx: `sudo service nginx start`
1. Start the `commun.ity` and `human.iam` express servers: `npm run deploy-issuer`

## Reset
1. Delete trusted issuers and tokens from the browser extension's `Debug` tab.
1. Delete `soc.ial` bio updates from local storage in the browser dev tools.