from fastapi import FastAPI,File,UploadFile
import os
from parser_utils import extract_entities,extract_text_from_pdf,extract_text_from_docx,extract_text_from_txt

app=FastAPI()

@app.post("/parse-resume/")

async def parse_resume(file: UploadFile = File(...)):
    temp_path=f'temp_{file.filename}'
    with open(temp_path,'wb') as f:
        f.write(await file.read())
    
    if file.filename.endswith('.pdf'):
        text=extract_text_from_pdf(temp_path)
    elif file.filename.endswith('.docx'):
        text=extract_text_from_docx(temp_path)
    elif file.filename.endswith('.txt'):
        text=extract_text_from_txt(temp_path)
    else:
        os.remove(temp_path)
        return {"error": "Unsupported file type. Please upload a PDF, DOCX, or TXT file."}
    os.remove(temp_path)
    entities=extract_entities(text)
    return entities
