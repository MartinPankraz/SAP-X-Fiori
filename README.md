# SAP-X-Fiori
[![Build Status](https://dev.azure.com/mukurtul/Project%20X/_apis/build/status/Project%20X-CI?branchName=master)](https://dev.azure.com/mukurtul/Project%20X/_build/latest?definitionId=6&branchName=master)

Visualization of Flight Sample data from public SAP ERP ES5 enriched with Sentiment Scores based on Twitter feed data.

![reference architecture](https://github.com/MartinPankraz/SAP-X-Fiori/blob/master/img/cognitive-SAP.png)

Find more details on my blog post: https://blogs.sap.com/2020/03/04/your-sap-data-becomes-sentimental/

## Installation and Configuration

I provided ARM templates from an export of my demo landscape, so you can spin up your own version of it. Path: /templates. On Azure simply navigate to "Deploy a custom template" > "Build your onw tempalte in the editor" and upload it.

However there are some pitfalls. Some components are dependent on your tenant and this is reflected in my export. To overcome that I put placeholders in the template "<<< some text >>>" so you can identify the relevant sections quickly.
On top of that you need to check the naming of the components, because some of them need to be unique. I left my instances for easier spotting. You need to alter them to avoid conflict.

Bottom line: there are some manual steps to actually import this. During the next iteration I will try to make this a smoother process. Until then the most important thing on the ARM template is the config of the LogicApp, as it contains the heavy lifting of all the integration. The rest could be quickly created from scratch.

Feel free to reach out via the [GitHub Issues tab](https://github.com/MartinPankraz/SAP-X-Fiori/issues)
