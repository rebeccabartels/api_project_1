const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [
    {
        name: 'mashable',
        address: 'https://mashable.com/category/tech-industry',
        base: 'https://mashable.com/tech'
    },
    {
        name: 'vpnmentor',
        address: 'https://www.vpnmentor.com/blog/best-no-log-vpns/',
        base: 'https://www.vpnmentor.com'
    },
    {
        name: 'pcmag',
        address: 'https://www.pcmag.com/',
        base: 'https://www.pcmag.com'
    },
    {
        name: 'tomsguide',
        address: 'https://www.tomsguide.com/',
        base: 'https://www.tomsguide.com'
    },
    {
        name: 'usnews',
        address: 'https://www.usnews.com/',
        base: 'https://www.usnews.com'
    },
    {
        name: 'vpnranks',
        address: 'https://www.vpnranks.com/',
        base: 'https://www.vpnranks.com'
    },
    {
        name: 'nytimes',
        address: 'https://www.nytimes.com/',
        base: 'https://www.nytimes.com'
    },
    {
        name: 'techradar',
        address: 'https://www.techradar.com/',
        base: 'https://www.techradar.com/'
    },
    {
        name: 'knowtechie',
        address: 'https://knowtechie.com/tag/security/',
        base: 'https://knowtechie.com'
    },
    {
        name: 'extremetech',
        address: 'https://www.extremetech.com/tag/security',
        base: 'https://www.extremetech.com'
    },
    {
        name: 'technewsworld',
        address: 'https://www.technewsworld.com/section/security',
        base: 'https://www.technewsworld.com'
    },
    {
        name: 'gizmodo',
        address: 'https://gizmodo.com/tech/privacy-and-security',
        base: 'https://gizmodo.com'
    },
    {
        name: 'lifehacker',
        address: 'https://lifehacker.com/tech/privacy',
        base: 'https://lifehacker.com/tech'
    },
    {
        name: 'wired',
        address: 'https://www.wired.com/category/security/',
        base: 'https://www.wired.com'
    },
    {
        name: 'arstechnica',
        address: 'https://arstechnica.com/information-technology',
        base: 'https://arstechnica.com'
    },
    {
        name: 'hackernoon',
        address: 'https://hackernoon.com/tagged/cybersecurity',
        base: 'https://hackernoon.com'
    },
    {
        name: 'techrepublic',
        address: 'https://www.techrepublic.com/topic/security/',
        base: 'https://www.techrepublic.com'
    },
    {
        name: 'techradar',
        address: 'https://www.techradar.com/',
        base: 'https://www.techradar.com/'
    },
    {
        name: 'androidcentral',
        address: 'https://www.androidcentral.com',
        base: 'https://www.androidcentral.com'
    },
    {
        name: 'informationweek',
        address: 'https://www.informationweek.com/security-and-risk-strategy',
        base: 'https://www.informationweek.com'
    },
    {
        name: 'siliconangle',
        address: 'https://siliconangle.com/category/security',
        base: 'https://siliconangle.com'
    },
    {
        name: 'slashgear',
        address: 'https://www.slashgear.com/category/technology',
        base: 'https://www.slashgear.com'
    },
    {
        name: 'theverge',
        address: 'https://www.theverge.com/cyber-security',
        base: 'https://www.theverge.com'
    },

    {
        name: 'jisaoftech',
        address: 'https://www.jisasoftech.com',
        base: 'https://www.jisasoftech.com/'
    },
    {
        name: 'infosecurity-magazine',
        address: 'https://www.infosecurity-magazine.com',
        base: 'https://www.infosecurity-magazine.com'
    },
    {
        name: 'grahamcluley',
        address: 'https://grahamcluley.com/',
        base: 'https://grahamcluley.com/'
    },
    {
        name: 'thehackernews',
        address: 'https://thehackernews.com/',
        base: 'https://thehackernews.com/'
    },
    {
        name: 'lastwatchdog',
        address: 'https://www.lastwatchdog.com',
        base: 'https://www.lastwatchdog.com'
    },
    {
        name: 'insidecybersecurity',
        address: 'https://insidecybersecurity.com/',
        base: 'https://insidecybersecurity.com/'
    },
    {
        name: 'cyberark',
        address: 'https://www.cyberark.com/resources/blog',
        base: 'https://www.cyberark.com'
    },
    {
        name: 'schneier',
        address: 'https://www.schneier.com/',
        base: 'https://www.schneier.com/'
    },
    {
        name: 'krebonsecurity',
        address: 'https://krebsonsecurity.com/',
        base: 'https://krebsonsecurity.com/'
    }, 
    {
        name: 'cnet',
        address: 'https://www.cnet.com/tech/services-and-software/cybersecurity/',
        base: 'https://www.cnet.com/tech/'
    },
    {
        name: 'bhconsulting',
        address: 'https://bhconsulting.ie/securitywatchblog/',
        base: 'https://bhconsulting.ie'
    }, 
    {
        name: 'homelandsecuritynews',
        address: 'https://www.homelandsecuritynewswire.com/topics/cybersecurity',
        base: 'https://www.homelandsecuritynewswire.com'
    },
    {
        name: 'itportal',
        address: 'https://www.itproportal.com/security/',
        base: 'https://www.itproportal.com/'
    }, 
    {
        name: 'lawfareblog',
        address: 'https://www.lawfareblog.com/topic/cybersecurity',
        base: 'https://www.lawfareblog.com'
    },
    {
        name: 'rapid7',
        address: 'https://www.rapid7.com/blog/',
        base: 'https://www.rapid7.com'
    },
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/technology/data-computer-security',
        base: 'https://www.theguardian.com/technology/'
    },
    {
        name: 'gbhackers',
        address: 'https://gbhackers.com/',
        base: 'https://gbhackers.com/'
    },
    {
        name: 'vice',
        address: 'https://www.vice.com/en/section/tech',
        base: 'https://www.vice.com/en/'
    },
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/technology/data-computer-security',
        base: 'https://www.theguardian.com/technology/'
    },
    
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("cyber")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my Cyber News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("cyber")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))