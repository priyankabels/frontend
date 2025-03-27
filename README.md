# React + Vite

# BookStore Application 
## This is a application for book lovers who can view Book, its details and Add to Cart if already in Cart remove from Cart and view cart and further order the book is a future scope. It also gives some admin functionalities liek add, delete and Remove a book from our database.

 We have below pages in Priyanka's BookStore

- Home Page or Landing Page which shows recently added books 
- All Books page which shows all books that are available in our database
- View Book Details page which shows description for the Book and gives Add Cart , Remove Cart option . On this page also when user is admin he will be able to see EDIT and DELETE book
- Add Book page which is also availabel only for admin
- Cart Page which shows all the added books and their total , it also gives an option to delete or remoce from the cart and adjust total accordingly

# API endpoints used in this application

GET - api/book
POST -api/book
GET book by ID - api/book/{bookID}
PUT book by ID - api/book/{bookID}
DELETE book by ID - api/book/{bookID}
GET RECENT books -api/book/recentbooks/get4

- Third Party API
https://www.googleapis.com/books/v1/volumes/

# Technologies Used:
DATABASE : MongoDB /Momgoose
FRONTEND : REACT, Javascript, Tailwind
BACKEND : Node js, Express
