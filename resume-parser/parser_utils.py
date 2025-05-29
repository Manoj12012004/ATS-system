import fitz
import docx
import re
import spacy

nlp=spacy.load('en_core_web_sm')

def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file.
    """
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_text_from_docx(docx_path):
    """
    Extract text from a DOCX file.
    """
    doc = docx.Document(docx_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def extract_text_from_txt(txt_path):
    """
    Extract text from a TXT file.
    """
    with open(txt_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return text

def extract_entities(text):
    doc=nlp(text)
    name=next((ent.text for ent in doc.ents if ent.label_=='PERSON'),None)
    email=re.search(r'[\w\.-]+@[\w\.-]+',text)
    phone=re.search(r"\+?\d[\d\s\-\(\)]{7,}\d",text)
    
    return {
        'name':name,
        'email':email.group() if email else None,
        'phone':phone.group() if phone else None,
        'skills':extract_skills(text),
        'experience':extract_experience(text),
    }
    
def extract_skills(text):
    common_skills = ["Python", "Java", "SQL", "JavaScript", "C++", "Machine Learning", "React", "Node.js", "Django", "Flask", "HTML", "CSS", "Git", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud"]
    found=[skill for skill in common_skills if skill.lower() in text.lower()]
    return list(set(found))

def extract_experience(text):
    match = re.search(r'(\d+)\+?\s*(?:years|yrs)?\s+experience', text, re.I)
    return int(match.group(1)) if match else None

