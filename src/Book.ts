// 추상 클래스 Book (책에 대한 기본 속성과 메서드를 정의)
// * abstract란? 추상 클래스는 다른 클래스들이 상속받을 수 있는 클래스이며, 직접 인스턴스화할 수 없다.
abstract class Book {
  // * protected란? 클래스 내부와 하위 클래스에서만 접근 가능한 멤버를 정의할 때 사용된다.
  protected title: string;
  protected author: string;
  protected isbn: string;
  protected isCheckedOut: boolean;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isCheckedOut = false; // 초기에는 책이 대출되지 않은 상태
  }

  // 책의 대출 상태를 확인하는 메서드
  isAvailable(): boolean {
    return !this.isCheckedOut;
  }
  // isbn을 가져오는 getter 메서드
  getIsbn(): string {
    return this.isbn;
  }

  //* abstract가 메서드에 사용될 때는? 추상 메서드는 추상 클래스 내에서 선언되며, 구현부가 없다. 이 메서드는 하위 클래스에서 반드시 구현되어야 한다.
  // 대출 메서드
  abstract checkOut(): void;

  // 반납 메서드
  abstract returnBook(): void;
}

// 일반 책 클래스
// * Book클래스에서 확장(extends)되었다. 이는 RegularBook 클래스가 Book 클래스의 속성과 메서드를 상속받는다는 것을 의미한다.
class RegularBook extends Book {
  // * 생성자 함수
  constructor(title: string, author: string, isbn: string) {
    // * super란? 부모 클래스의 생성자를 호출하는 데 사용된다. 이를 통해 부모 클래스의 초기화 로직을 실행할 수 있다.
    // * 초기화 로직이란? 클래스의 인스턴스가 생성될 때 필요한 초기 설정을 수행하는 코드를 말한다.
    // * 클래스의 인스턴스가 생성될 때는? 생성자 함수가 호출되는 시점을 말한다.
    // * 생성자 함수가 호출되는 시점에서 super()를 호출하여 부모 클래스의 생성자를 실행하고, 이를 통해 부모 클래스의 초기화 로직을 수행한다.
    // * 이후 자식 클래스의 생성자 함수에서 추가적인 초기화 작업을 수행할 수 있다.
    // * 이러한 상속과 초기화 로직을 통해 코드의 재사용성과 유지보수성을 높일 수 있다.
    super(title, author, isbn);
  }

  // 책 대출
  checkOut() {
    if (this.isAvailable()) {
      this.isCheckedOut = true;
      console.log(`${this.title} 책을 대출했습니다.`);
    } else {
      console.log(`${this.title} 책은 이미 대출 중입니다.`);
    }
  }

  // 책 반납
  returnBook() {
    if (!this.isAvailable()) {
      this.isCheckedOut = false;
      console.log(`${this.title} 책을 반납했습니다.`);
    } else {
      console.log(`${this.title} 책은 대출되지 않았습니다.`);
    }
  }
}

// 전자책 클래스
class Ebook extends Book {
  // * provate란? 클래스 내부에서만 접근 가능한 멤버를 정의할 때 사용된다.
  private isDownloaded: boolean;

  constructor(title: string, author: string, isbn: string) {
    super(title, author, isbn);
    // 초기에는 전자책이 다운로드되지 않은 상태
    this.isDownloaded = false;
  }

  // 전자책 다운로드
  download() {
    if (!this.isDownloaded) {
      this.isDownloaded = true;
      console.log(`${this.title} 전자책을 다운로드했습니다.`);
    } else {
      console.log(`${this.title} 전자책은 이미 다운로드되었습니다.`);
    }
  }

  // 전자책 대출
  checkOut() {
    if (this.isAvailable()) {
      console.log(`${this.title} 전자책을 대출했습니다.`);
    } else {
      console.log(`${this.title} 전자책은 이미 대출 중입니다.`);
    }
  }

  // 전자책 반납
  returnBook() {
    if (!this.isAvailable()) {
      console.log(`${this.title} 전자책을 반납했습니다.`);
    } else {
      console.log(`${this.title} 전자책은 대출되지 않았습니다.`);
    }
  }
}

// 도서관 클래스
class Library {
  // * private란? 클래스 내부에서만 접근 가능한 멤버를 정의할 때 사용된다.
  private books: Book[] = [];

  // 책 추가
  addBook(book: Book): void {
    this.books.push(book);
  }

  // 책 검색
  searchBook(isbn: string): Book | undefined {
    return this.books.find((book) => book.getIsbn() === isbn);
  }

  // 책 대출
  checkOutBook(isbn: string): void {
    const book = this.searchBook(isbn);
    if (book) {
      book.checkOut();
    } else {
      console.log("책을 찾을 수 없습니다.");
    }
  }

  // 책 반납
  returnBook(isbn: string): void {
    const book = this.searchBook(isbn);
    if (book) {
      book.returnBook();
    } else {
      console.log("책을 찾을 수 없습니다.");
    }
  }
}

// 관리자 클래스
class Admin {
  private library: Library;

  constructor(library: Library) {
    this.library = library;
  }

  // 책 추가
  addBookToLibrary(book: Book): void {
    this.library.addBook(book);
    console.log(`도서관에 ${book["title"]}을(를) 추가했습니다.`);
  }

  // 책 삭제
  removeBookFromLibrary(isbn: string): void {
    const bookIndex = this.library["books"].findIndex(
      (book) => book["isbn"] === isbn
    );
    if (bookIndex !== -1) {
      this.library["books"].splice(bookIndex, 1);
      console.log(`도서관에서 책이 삭제되었습니다.`);
    } else {
      console.log("책을 찾을 수 없습니다.");
    }
  }
}

// 테스트 코드
const library = new Library();
const admin = new Admin(library);

const book1 = new RegularBook(
  "자바스크립트 완벽 가이드",
  "David Flanagan",
  "978-1491950296"
);
const book2 = new Ebook("리액트 완벽 가이드", "Dan Abramov", "978-1491954638");

admin.addBookToLibrary(book1);
admin.addBookToLibrary(book2);

library.checkOutBook("978-1491950296");
library.checkOutBook("978-1491954638");
library.returnBook("978-1491950296");

const bookNotFound = library.searchBook("123-4567890");
if (bookNotFound) {
  console.log(`책을 찾았습니다: ${bookNotFound["title"]}`);
} else {
  console.log("책을 찾을 수 없습니다.");
}
