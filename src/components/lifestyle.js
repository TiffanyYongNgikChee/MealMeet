import React from "react";
import Footer from "./Footer";

const Lifestyle = () => {
  const newsData = [
    { id: 1, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(4).png_rPbs3l?tr=w-1270", topic: "Iceland is selling a giant pig in blanket in a Yorkshire pudding for Christmas" },
    { id: 2, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(5).png_EmhmOm?tr=w-1270", topic: "Chicken chain adored by top Hollywood stars is coming to the UK for the first time" },
    { id: 3, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(3).png_o5Cmrv?tr=w-1270", topic: "McDonald's unveils Christmas menu with cheesy twist on popular burger and chocolate orange pie" },
    { id: 4, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(4).png_ZYpAxM?tr=w-1270", topic: "NPopeyes' festive menu lands today - with new burgers and festive hash browns" },
    { id: 5, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(2).png_glcnB9?tr=w-1270", topic: "KFC unveils its limited edition Christmas menu and it is the perfect festive feast" },
    { id: 6, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/2024/01/eee6c05f-eaa2-4e68-9e31-c14b3a3f96e3/2024-01-08T181309/pv8g0Ro3rWKWgkjJKRApTcErvr1N7fnTdpd0OKpD.jpg?tr=w-1270&config=eyJuYW1lIjoiZWRpdGFibGUgdGVtcGxhdGUgKDcxKS5qcGciLCJhbHRlcm5hdGl2ZV90ZXh0IjoiZWRpdGFibGUgdGVtcGxhdGUgKDcxKS5qcGciLCJjb29yZGluYXRlcyI6eyJkZXNrdG9wIjp7ImxlZnQiOjAsInRvcCI6MCwicmlnaHQiOjEsImJvdHRvbSI6MC42Nn0sInRhYmxldCI6eyJsZWZ0IjpudWxsLCJ0b3AiOm51bGwsInJpZ2h0IjpudWxsLCJib3R0b20iOm51bGx9LCJtb2JpbGUiOnsibGVmdCI6bnVsbCwidG9wIjpudWxsLCJyaWdodCI6bnVsbCwiYm90dG9tIjpudWxsfX0sIndpZHRoIjozMTcyLCJoZWlnaHQiOjIxMDl9", topic: "The best vegan restaurants London has to offer " },
    { id: 7, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate-2024-10-30T164736.016.jpg_XlMnEc?tr=w-1270", topic: "Akoko founder Aji Akokomi on the UK African food spots you should visit" },
    { id: 8, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate(1).png_mudeZc?tr=w-1270", topic: "Lidl is bringing out Biscoff-inspired caramel biscuit cream liqueur in new range" },
    { id: 9, src: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/editabletemplate-2024-10-22T171257.671.jpg_225Oqs?tr=w-1270", topic: "Aldi just launched 'Christmas Easter eggs' and people are divided" },
  ];

  return (
    <div>
        <div class="images">
        <img src="https://twistedfood.s3.us-west-1.amazonaws.com/images/star-burst-top.svg" alt="Left Header Image"/>
        <span class="app-name">All Articles</span>
        <img src="https://twistedfood.s3.us-west-1.amazonaws.com/images/2-eggs-vector.svg" alt="Right Header Image"/>
        </div>
        <hr></hr>
        <div className="food-news-container">
        <h1 className="food-news-title">News</h1>
        <div className="food-news-grid">
            {newsData.map((news) => (
            <div key={news.id} className="food-news-item">
                <img src={news.src} alt={`News ${news.id}`} className="food-news-poster" />
                <h2 className="food-news-topic">{news.topic}</h2>
            </div>
            ))}
        </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default Lifestyle;
