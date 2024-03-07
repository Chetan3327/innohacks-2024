import fitz  # PyMuPDF
import os
import re
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from better_profanity import profanity 

app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

GOOGLE_KEY = os.environ.get("GOOGLE_KEY")

def contains_prices(text: str) -> bool:
    # Define regular expressions for various currencies and terms
    currency_patterns = {
        "dollar": r'\$\d+(\.\d{2})?',
        "rupee": r'₹\s*\d+(\.\d{2})?',
        "euro": r'€\s*\d+(\.\d{2})?',
        "rate": r'rate',
        "prices": r'prices'
    }
    
    # Check if any of the currency patterns or terms are present in the text
    prices_found = False
    for pattern in currency_patterns.values():
        if re.search(pattern, text, re.IGNORECASE):
            prices_found = True
            break

    return prices_found

def detect_images_in_pdf(file_path: str) -> bool:
    doc = fitz.open(file_path)
    has_images = False
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)  # Corrected line: load_page instead of doc[page_num]
        images = page.get_images(full=True)
        if images:
            has_images = True
            break
    doc.close()
    return has_images


def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    try:
        doc = fitz.open(file_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
    finally:
        if doc:
            doc.close()
    return text


def contains_foul_language(text: str) -> bool:
    # Use profanity-check to detect foul language
    text = profanity.censor(text, '`')
    if '`' in text:
        return True
    return False

@app.post("/extract-text")
async def extract_text(upload_file: UploadFile = File(...)):
    try:
        # Save the uploaded file to a temporary location
        with open(upload_file.filename, "wb") as temp_file:
            temp_file.write(upload_file.file.read())

        # Extract text from the PDF file
        extracted_text = extract_text_from_pdf(upload_file.filename)
        has_foul_language = contains_foul_language(extracted_text)
        has_images = detect_images_in_pdf(upload_file.filename)
        has_price = contains_prices(extracted_text)

        # Return the extracted text, formatted text, and foul language detection result
        return JSONResponse(content={"extracted_text": extracted_text, "length": len(extracted_text), "has_foul_language": has_foul_language, "has_images": has_images, "has_price": has_price}, status_code=200)

    finally:
        # Cleanup: remove the temporary file
        if os.path.exists(upload_file.filename):
            os.remove(upload_file.filename)



if __name__ == '_main_':
    uvicorn.run(app, host='127.0.0.1', port=8000)