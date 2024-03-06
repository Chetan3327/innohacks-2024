from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import os
import uvicorn

app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    doc.close()
    return text

@app.post("/extract-text")
async def extract_text(upload_file: UploadFile = File(...)):
    try:
        # Save the uploaded file to a temporary location
        with open(upload_file.filename, "wb") as temp_file:
            temp_file.write(upload_file.file.read())

        # Extract text from the PDF file
        extracted_text = extract_text_from_pdf(upload_file.filename)

        # Return the extracted text as JSON response
        return JSONResponse(content={"text": extracted_text}, status_code=200)

    finally:
        # Cleanup: remove the temporary file
        if os.path.exists(upload_file.filename):
            os.remove(upload_file.filename)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)