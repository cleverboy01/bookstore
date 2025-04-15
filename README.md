Comprehensive Documentation of the Online Bookstore Project  
**Table of Contents**  
- Introduction  
- Project Structure  
- Main Features  
  - Escrow Payment System  
  - Order Tracking  
  - Rating and Review System  
  - Multilingual Support  
  - AI Chat  
  - About Us Page  
- Installation and Setup Guide  
- Development Stages  
- Technologies Used  

**Introduction**  
This project is an online bookstore developed using React and JavaScript. The primary goal is to create a secure and user-friendly platform for buying and selling books, utilizing an escrow payment system to ensure transaction security.  

In this system, when a user purchases a book, the payment is held in the system's account and only transferred to the seller after the buyer confirms receipt of the book and the seller confirms shipment.  

**Main Features**  

**Escrow Payment System**  
The escrow payment system is a key feature that ensures transaction security. It operates as follows:  
1. The buyer selects and purchases a book.  
2. The payment is held in the system's account.  
3. The seller ships the book.  
4. The buyer confirms receipt of the book.  
5. The seller confirms shipment.  
6. The system releases the payment to the seller's account.  

This system is implemented in the files `EscrowContext.js`, `CartPage.js`, and `OrderPage.js`.  

**Order Tracking**  
The order tracking system allows users to view the status of their orders at every stage. The stages include:  
- Order Placed  
- Order Processing  
- Order Shipped  
- Order Delivered  

This system is implemented in the file `OrderPage.js`.  

**Rating and Review System**  
The rating and review system enables users to submit reviews and rate books. It includes:  
- Displaying the average rating.  
- Showing the distribution of ratings (e.g., percentage of 5-star, 4-star, etc.).  
- Displaying user reviews.  
- Allowing users to submit new reviews and ratings.  

This system is implemented in the files `RatingContext.js` and `RatingPage.js`.  

**Multilingual Support**  
The multilingual support system allows users to select their preferred language. Supported languages include:  
- Persian  
- English  
- Arabic  
- French  

It also supports text direction changes (RTL/LTR) and date formatting.  

This system is implemented in the files `i18n.js` and `LanguagePage.js`.  

**AI Chat**  
The AI chat system enables users to interact with intelligent advisors and ask questions about books. It includes four types of advisors:  
- General Book Advisor  
- Book Recommender  
- Website Support  
- Literature Expert  

This system is implemented in the files `AIChatContext.js`, `AIChat.js`, and `ChatPage.js`.  

**About Us Page**  
The About Us page provides information about the bookstore, the team, social media links (Twitter, Instagram, Telegram), and contact details.  

This page is implemented in the file `AboutPage.js`.  

**Installation and Setup Guide**  
To install and run the project, follow these steps:  

1. Clone the project from GitHub or download and extract the zip file:  
   ```bash  
   https://github.com/cleverboy01/bookstore.git
   cd bookstore
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Run the project in development mode:  
   ```bash  
   npm start  
   ```  
4. Build the production version:  
   ```bash  
   npm run build  
   ```  

**Development Stages**  
The project was developed in several stages:  
1. **React Project Setup**: Creating the project using Create React App and installing core dependencies.  
2. **Project Structuring**: Setting up the folder and file structure.  
3. **Building Base UI Components**: Creating basic components like Button, Form, Modal, etc.  
4. **Creating Book List and Details Pages**: Implementing pages to display books and their details.  
5. **Implementing User Authentication**: Creating login, registration, password recovery, and user profile pages.  
6. **Developing Escrow Payment System**: Implementing the escrow system and shopping cart page.  
7. **Creating Order Tracking System**: Implementing the order tracking page with order stage displays.  
8. **Building Rating and Review System**: Implementing the system for submitting and displaying reviews and ratings.  
9. **Implementing Multilingual Support**: Adding language switching and text direction capabilities.  
10. **Developing AI Chat Feature**: Implementing the intelligent advisor chat system.  
11. **Creating About Us Page**: Designing the About Us page with team info and social media links.  
12. **Testing Application Performance**: Ensuring all features function correctly.  

**Technologies Used**  
The project utilizes the following technologies:  
- **React**: JavaScript library for building user interfaces.  
- **React Router**: For managing navigation in the application.  
- **Context API**: For state management across the application.  
- **Styled Components**: For styling components.  
- **React Icons**: For using icons.  
- **i18next**: For implementing multilingual support.  
- **Axios**: For making HTTP requests.
