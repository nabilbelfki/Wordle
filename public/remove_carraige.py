def remove_carriage_returns(filename):
    # Read the file
    with open(filename, 'r', newline='') as f:
        content = f.read()
    
    # Remove all \r characters
    cleaned_content = content.replace('\r', '')
    
    # Write the cleaned content back to the file
    with open(filename, 'w', newline='') as f:
        f.write(cleaned_content)
    
    print(f"Removed \\r characters from {filename}")

# Example usage:
remove_carriage_returns('valid-words.csv')
remove_carriage_returns('word-bank.csv')