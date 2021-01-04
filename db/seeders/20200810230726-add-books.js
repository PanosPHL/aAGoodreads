'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        title: "Harry Potter and the Sorcerer's Stone",
        summary: `Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry. After a lifetime of bottling up his magical powers, Harry finally feels like a normal kid. But even within the Wizarding community, he is special. He is the boy who lived: the only person to have ever survived a killing curse inflicted by the evil Lord Voldemort, who launched a brutal takeover of the Wizarding world, only to vanish after failing to kill Harry. Though Harry's first year at Hogwarts is the best of his life, not everything is perfect. There is a dangerous secret object hidden within the castle walls, and Harry believes it's his responsibility to prevent it from falling into evil hands. But doing so will bring him into contact with forces more terrifying than he ever could have imagined. Full of sympathetic characters, wildly imaginative situations, and countless exciting details, the first installment in the series assembles an unforgettable magical world and sets the stage for many high-stakes adventures to come.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SY475_.jpg',
        ISBN: '0439708184',
        publishingDate: new Date('September 1 1998'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        summary: `Ever since Harry Potter had come home for the summer, the Dursleys had been so mean and hideous that all Harry wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he’s packing his bags, Harry receives a warning from a strange impish creature who says that if Harry returns to Hogwarts, disaster will strike. And strike it does. For in Harry’s second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor and a spirit who haunts the girls’ bathroom. But then the real trouble begins – someone is turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possible be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects… Harry Potter himself!`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474169725l/15881._SY475_.jpg',
        ISBN: '0439064864',
        publishingDate: new Date('June 2 1999'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        summary: `Harry Potter's third year at Hogwarts is full of new dangers. A convicted murderer, Sirius Black, has broken out of Azkaban prison, and it seems he's after Harry. Now Hogwarts is being patrolled by the dementors, the Azkaban guards who are hunting Sirius. But Harry can't imagine that Sirius or, for that matter, the evil Lord Voldemort could be more frightening than the dementors themselves, who have the terrible power to fill anyone they come across with aching loneliness and despair. Meanwhile, life continues as usual at Hogwarts. A top-of-the-line broom takes Harry's success at Quidditch, the sport of the Wizarding world, to new heights. A cute fourth-year student catches his eye. And he becomes close with the new Defense of the Dark Arts teacher, who was a childhood friend of his father. Yet despite the relative safety of life at Hogwarts and the best efforts of the dementors, the threat of Sirius Black grows ever closer. But if Harry has learned anything from his education in wizardry, it is that things are often not what they seem. Tragic revelations, heartwarming surprises, and high-stakes magical adventures await the boy wizard in this funny and poignant third installment of the beloved series.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1499277281l/5.jpg',
        ISBN: '043965548X',
        publishingDate: new Date('September 8 1999'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Goblet of Fire',
        summary: `Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup with Hermione, Ron, and the Weasleys. He wants to dream about Cho Chang, his crush (and maybe do more than dream). He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for hundreds of years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554006152l/6.jpg',
        ISBN: '9781408855683',
        publishingDate: new Date('September 28 2002'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Order of the Phoenix',
        summary: `There is a door at the end of a silent corridor. And it’s haunting Harry Pottter’s dreams. Why else would he be waking in the middle of the night, screaming in terror? Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named - a threat that neither the magical government nor the authorities at Hogwarts can stop. As the grasp of darkness tightens, Harry must discover the true depth and strength of his friends, the importance of boundless loyalty, and the shocking price of unbearable sacrifice. His fate depends on them all.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg',
        ISBN: '0439358078',
        publishingDate: new Date('June 21 2003'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Half-Blood Prince',
        summary: `The war against Voldemort is not going well; even Muggle governments are noticing. Ron scans the obituary pages of the Daily Prophet, looking for familiar names. Dumbledore is absent from Hogwarts for long stretches of time, and the Order of the Phoenix has already suffered losses. And yet... As in all wars, life goes on. The Weasley twins expand their business. Sixth-year students learn to Apparate - and lose a few eyebrows in the process. Teenagers flirt and fight and fall in love. Classes are never straightforward, through Harry receives some extraordinary help from the mysterious Half-Blood Prince. So it's the home front that takes center stage in the multilayered sixth installment of the story of Harry Potter. Here at Hogwarts, Harry will search for the full and complete story of the boy who became Lord Voldemort - and thereby find what may be his only vulnerability.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1587697303l/1._SX318_.jpg',
        ISBN: '0439784549',
        publishingDate: new Date('July 16 2005'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Harry Potter and the Deathly Hallows',
        summary: `Harry Potter is leaving Privet Drive for the last time. But as he climbs into the sidecar of Hagrid’s motorbike and they take to the skies, he knows Lord Voldemort and the Death Eaters will not be far behind. The protective charm that has kept him safe until now is broken. But the Dark Lord is breathing fear into everything he loves. And he knows he can’t keep hiding. To stop Voldemort, Harry knows he must find the remaining Horcruxes and destroy them. He will have to face his enemy in one final battle.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474171184l/136251._SY475_.jpg',
        ISBN: '0545010225',
        publishingDate: new Date('July 21 2007'),
        publisherId: 1,
        seriesId: 1,
      },
      {
        title: 'Miles: The Autobiography',
        summary: `For more than forty years Miles Davis has been in the front rank of American music. Universally acclaimed as a musical genius, Miles is one of the most important and influential musicians in the world. The subject of several biographies, now Miles speaks out himself about his extraordinary life.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348411049l/829313.jpg',
        ISBN: '9780671725822',
        publishingDate: new Date('September 15 1990'),
        publisherId: 2,
      },
      {
        title: 'Thinking, Fast And Slow',
        summary: `In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman exposes the extraordinary capabilities—and also the faults and biases—of fast thinking, and reveals the pervasive influence of intuitive impressions on our thoughts and behavior. The impact of loss aversion and overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the challenges of properly framing risks at work and at home, the profound effect of cognitive biases on everything from playing the stock market to planning the next vacation—each of these can be understood only by knowing how the two systems work together to shape our judgments and decisions.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377.jpg',
        publishingDate: new Date('October 25 2011'),
        ISBN: '0374275637',
        publisherId: 3,
      },
      {
        title: 'Tao of Jeet Kune Do',
        summary: `From the Introduction: "In 1970, Bruce sustained a rather sever injury to his back. His doctors ordered him to discontinue the practice of martial arts and to remain in bed to allow his back heal. This was probably the most trying and dispiriting time in Bruce's life. He stayed in bed, virtually flat on his back for six months, but he couldn't keep his mind from working - the result of which is this book." Linda Lee "Jeet Kune Do, you see, has no definite lines or boundaries - only those you make yourself." Gilbert L Johnson`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386920607l/57858.jpg',
        publishingDate: new Date('October 1 1975'),
        ISBN: '0897500482',
        publisherId: 4,
      },
      {
        title: 'The Art of War/The Art of Warfare',
        summary: `Sun Tzu and Sun Pin's timeless strategic masterpieces are constantly analyzed and interpreted by leaders worldwide. For the first time ever, author D.E. Tarver explains the classic texts, The Art of War by Sun Tzu and The Art of Warfare by Sun Pin, in plain English.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387677448l/19605970.jpg',
        publishingDate: new Date('April 19 2002'),
        ISBN: 'B005GEFCMQ',
        publisherId: 5,
      },
      {
        title: 'The White Tiger',
        summary: `Introducing a major literary talent, The White Tiger offers a story of coruscating wit, blistering suspense, and questionable morality, told by the most volatile, captivating, and utterly inimitable narrator that this millennium has yet seen.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347754998l/1768603.jpg',
        publishingDate: new Date('January 18 2008'),
        ISBN: '1416562591',
        publisherId: 6,
      },
      {
        title:
          'The One Thing: The Surprisingly Simple Truth Behind Extraordinary Results',
        summary: `The One Thing explains the success habit to overcome the six lies that block our success, beat the seven thieves that steal time, and leverage the laws of purpose, priority, and productivity.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1559563270l/16256798._SX318_.jpg',
        publishingDate: new Date('April 1 2013'),
        ISBN: '1885167776',
        publisherId: 7,
      },
      {
        title: "Pandolfini's Ultimate Guide to Chess",
        summary: `From America’s foremost chess coach and game strategist for Netflix’s The Queen’s Gambit comes a comprehensive guide covering all aspects of the game, to improve your technique whether you are a newcomer or a longtime fan.`,
        cover:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388623005l/360163.jpg',
        publishingDate: new Date('September 9 2003'),
        ISBN: '0743226178',
        publisherId: 8,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
