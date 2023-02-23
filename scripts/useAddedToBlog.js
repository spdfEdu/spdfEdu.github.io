link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://spdfedu.github.io/styles/addedToBlog.css'
  head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(link);
    
  script = document.createElement('script')
  script.src = 'https://spdfedu.github.io/scripts/addedToBlog.js'
  document.body.appendChild(script);
