from django.conf import settings
from django.core.mail import EmailMessage

class Util:
    @staticmethod
    def send_email(data):
        
        email = EmailMessage(subject=data['email_subject'], body=data['email_body'],to=[data['to_email']],from_email=settings.EMAIL_HOST_USER)
        email.send()

    @staticmethod
    def send_transaction(w3, contract, function_name, chain_id, address, private_key, *args):
        tx = contract.functions[function_name](*args).build_transaction({
            'chainId': int(chain_id),
            'from': address,
            'gas': 3000000,
            'gasPrice': w3.to_wei('1', 'gwei'),
            'nonce': w3.eth.get_transaction_count(address)
        })
        signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        return tx_receipt