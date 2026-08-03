import React from 'react';

const keywordsData = {
  popularSearches: [
    {
      title: 'Christian Matrimony Services',
      icon: 'fa-users',
      links: [
        'Christian Matrimony',
        'Christian Matchmaking Website',
        'Christian Marriage Bureau',
        'Free Christian Matrimony',
        'Christian Bride Groom Search',
        'Christian Matrimony India'
      ]
    },
    {
      title: 'Catholic Matrimony',
      icon: 'fa-university',
      links: [
        'Roman Catholic Matrimony',
        'Syrian Catholic Matrimony',
        'Latin Catholic Matrimony',
        'Kerala Catholic Matrimony',
        'Malankara Catholic Matrimony',
        'Knanaya Catholic Matrimony',
        'Goan Catholic Matrimony'
      ]
    },
    {
      title: 'Orthodox Matrimony',
      icon: 'fa-building-o',
      links: [
        'Malankara Orthodox Matrimony',
        'Jacobite Syrian Matrimony',
        'Knanaya Jacobite Matrimony'
      ]
    },
    {
      title: 'Protestant Matrimony',
      icon: 'fa-book',
      links: [
        'Marthoma Matrimony',
        'Marthoma Syrian Matrimony',
        'CSI Christian Matrimony',
        'CNI Christian Matrimony',
        'Pentecostal Matrimony',
        'Baptist Matrimony India',
        'Evangelical Christian Matrimony',
        'Protestant Matrimony India',
        'Born Again Christian Matrimony'
      ]
    },
    {
      title: 'Regional Christian Matrimony',
      icon: 'fa-map-marker',
      links: [
        'Kerala Christian Matrimony',
        'Malayali Christian Matrimony',
        'Kannada Christian Matrimony',
        'Tamil Christian Matrimony',
        'Telugu Christian Matrimony',
        'Mangalorean Christian Matrimony',
        'Nadar Christian Matrimony',
        'Cheramar Christian Matrimony',
        'Hindi Christian Matrimony',
        'Christian Matrimony in Bangalore',
        'Christian Matrimony in Chennai',
        'Christian Matrimony in Mumbai'
      ]
    }
  ],
  exploreCategories: [
    [
      'Christian Matrimony App',
      'Verified Christian Matrimony',
      'Christian Marriage Portal'
    ],
    [
      'Christian Brides in India',
      'Christian Grooms in India',
      'Christian Matrimony for Professionals'
    ],
    [
      'Christian Matrimony for NRIs',
      'Christian Matrimony Kerala',
      'Christian Matrimony Tamil Nadu'
    ],
    [
      'Christian Matrimony Karnataka',
      'Christian Matrimony Andhra Pradesh',
      'Christian Matrimony Telangana'
    ],
    [
      'Christian Matrimony Maharashtra',
      'Christian Matrimony Delhi'
    ]
  ]
};

export default function KeywordsSection() {
  return (
    <div className="w-full bg-[#fcfbfe] py-12 pb-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Popular Searches Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-[#d8c366]"></span>
            <i className="fa fa-leaf text-[#d8c366] text-sm"></i>
            <h2 className="text-[22px] md:text-[28px] text-[#4b1e7a] font-cormorant font-semibold text-center">
              Popular Christian Matrimony Searches
            </h2>
            <i className="fa fa-leaf text-[#d8c366] text-sm"></i>
            <span className="h-[1px] w-12 bg-[#d8c366]"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {keywordsData.popularSearches.map((section, index) => (
              <div key={index} className="bg-white rounded-lg border border-[#efe9f5] p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#f4ebfe] text-[#4b1e7a] flex items-center justify-center flex-shrink-0">
                    <i className={`fa ${section.icon} text-xs`}></i>
                  </div>
                  <h3 className="text-[#4b1e7a] font-semibold text-[13px] font-source">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#4b1e7a] mt-2 flex-shrink-0"></span>
                      <a href="#" className="text-[#555555] text-[12px] hover:text-[#4b1e7a] transition-colors font-source leading-snug block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Categories Section */}
        <div>
          <div className="bg-white rounded-lg border border-[#efe9f5] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#f4ebfe] text-[#4b1e7a] flex items-center justify-center flex-shrink-0">
                <i className="fa fa-star text-xs"></i>
              </div>
              <h3 className="text-[#4b1e7a] text-[18px] font-source font-semibold">
                Explore More Christian Matrimony Categories
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-3">
              {keywordsData.exploreCategories.map((column, colIndex) => (
                <ul key={colIndex} className="space-y-1.5">
                  {column.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#4b1e7a] mt-2 flex-shrink-0"></span>
                      <a href="#" className="text-[#555555] text-[12px] hover:text-[#4b1e7a] transition-colors font-source leading-snug block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
