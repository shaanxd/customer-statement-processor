# Customer Transaction Statement Processor

Application to read, parse and validate CSV/XML files while generating a PDF of the validation results.

## Assumptions

- Only valid CSV/XML files are provided. (Structure given below).
- Responses are returned in real time (hence no queuing jobs, leaning towards a straightforward REST API)
- No persistance on processed transactions, a file is generated and provided to the user in real time. The file is saved to be viewable later in the server but only consists of the reference, descriptions and the relevant issues of the transactions.

For XML files,

```
<records>
  <record reference="111551">
    <accountNumber>NL94DHJ2939FFSK</accountNumber>
    <description>Coffee money</description>
    <startBalance>94.9</startBalance>
    <mutation>+20.3</mutation>
    <endBalance>100</endBalance>
  </record>
</records>
```

For CSV files,

```
Reference,Account Number,Description,Start Balance,Mutation,End Balance
111551,NL94DHJ2939FFSK,Coffee money,94.9,20.3,100
```

## System Components

### Frontend: React Application

#### Features

- Provides a user interface for uploading CSV or XML files.
- Validates the input file type and sends the file to the backend for further validation.
- Receives a PDF report from the API and presents it to the user.

#### Built using

- [React](https://react.dev/) – I mean what do I say here :)
- [Redux Toolkit](https://redux-toolkit.js.org/) – For data fetching and caching.
- [React Hook Form](https://react-hook-form.com/) – For form management
- [React Hot Toast](https://react-hot-toast.com/) – For notifications
- [DaisyUI](https://daisyui.com/) – Really awesome CSS component library built using TailwindCSS

#### Try it out

### Backend: Node.js Express Application

#### Features

- Accepts uploaded CSV or XML files from the frontend.
- Parses the provided file and extracts transaction data.
- Performs two types of validations:
  1. Checks that all reference values are unique.
  2. Verifies that the end balance equals the starting balance plus the mutation for each transaction.
- Generates a PDF report listing any invalid transactions.
- Sends the PDF report back to the frontend as a response.

#### Built Using (Backend)

- [Express](https://expressjs.com/) – Web framework for Node.js
- [csv-parse](https://csv.js.org/parse/) – For CSV file parsing
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) – For XML file parsing
- [Multer](https://github.com/expressjs/multer) – For file uploads
- [Morgan](https://github.com/expressjs/morgan) – For HTTP request logging
- [PDFKit](https://pdfkit.org/) – For PDF generation

### Working Demo (Hosted via railway.app)

- **Service (API)**: [csp-service-production-746a.up.railway.app](csp-service-production-746a.up.railway.app)
- **Frontend**: [customer-statement-processor-production.up.railway.app](customer-statement-processor-production.up.railway.app)

## Future Improvements

- Add schema validation for transactions, to make sure every transaction has the existing properties. (Zod)
- Convert file input to a dropzone (I swear drag and drop is very cool...)
