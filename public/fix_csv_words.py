import csv

def clean_word_list(words):
    """Remove \r and empty entries, convert to lowercase"""
    return [word.strip().lower().replace('\r', '') for word in words if word.strip()]

def update_word_bank():
    # Read valid-words.csv and clean
    with open('valid-words.csv', 'r') as f:
        valid_words = clean_word_list(f.readlines())
    
    # Read word-bank.csv and clean
    with open('word-bank.csv', 'r') as f:
        word_bank = clean_word_list(f.readlines())
    
    # Find new words not in word-bank
    new_words = sorted(set(valid_words) - set(word_bank))
    
    if not new_words:
        print("No new words to add")
        return
    
    # Combine and sort all words
    all_words = sorted(set(word_bank + new_words))
    
    # Write back to word-bank.csv (without \r)
    with open('word-bank.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for word in all_words:
            writer.writerow([word])
    
    print(f"Added {len(new_words)} words to word-bank.csv")

if __name__ == "__main__":
    update_word_bank()