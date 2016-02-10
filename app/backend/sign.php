<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$config = array(
  "sellerId" => "A2IFYO67NXY9T6",
  "accessKey" => "AKIAINTXEKLDAJYM6JIQ",
  "lwaClientId" => " amzn1.application-oa2-client.8923917714964c0485fc5a76c39d31f9",
  "secretAccessKey" => "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"
);

$cart_ids = "1,0";

//$cart_ids = $_GET['productIds'];

$cart_array = explode(',', $cart_ids);
$cart_items = getProducts($cart_array);
$total_charge = 0;
foreach($cart_items as $item){
  $total_charge += $item['price'];
}

$returnURL = "http://test.com/";

//$signature = generateSig($total_charge, $returnURL, $config);
$total_charge = $total_charge/100;
$data = array(
  'accessKey' => $config['accessKey'],
  'amount' => $total_charge . "",
  'lwaClientId' => $config['lwaClientId'],
  'returnURL' => $returnURL,
  'sellerId' => $config['sellerId']
);

uksort($data, 'strcmp');

$signature = _signParameters($data, $config['secretAccessKey']);

echo '{ "auth": "' . $signature . '" }';

function getProducts($ids){
  $products_raw = file_get_contents("../data/products.json");
  $products = json_decode($products_raw, true);
  $cart = array();
  for($i = 0; $i < count($ids); $i++){
    array_push($cart, $products[$ids[$i]]);
  }
  return $cart;
}

function generateSig($amount, $returnURL, $config){
  $data = array(
  'accessKey' => $config['accessKey'],
  'amount' => $amount,
  'lwaClientId' => $config['lwaClientId'],
  'returnURL' => $returnURL,
  'sellerId' => $config['sellerId']
  );

  $sig_pre = "";

  $sig_raw = hash_hmac('SHA256', $sig_pre, $config['secretAccessKey'], true);
  $sig_string = rawurlencode(base64_encode($sig_raw));
  echo '{ "auth": "' . $sig_string . '" }';
}
function _signParameters(array $parameters, $key)
{
  $stringToSign = null;
  $algorithm    = "HmacSHA256";
  $stringToSign = _calculateStringToSignV2($parameters);

  return _sign($stringToSign, $key, $algorithm);
}
function _calculateStringToSignV2(array $parameters)
{
  $data = 'POST';
  $data .= "\n";
  $data .= "payments.amazon.com";
  $data .= "\n";
  $data .= "/";
  $data .= "\n";
  $data .= _getParametersAsString($parameters);
  return $data;
}
function _getParametersAsString(array $parameters)
{
  $queryParameters = array();
  foreach ($parameters as $key => $value) {
    $queryParameters[] = $key . '=' . _urlencode($value);
  }
  return implode('&', $queryParameters);
}
function _urlencode($value)
{
  return str_replace('%7E', '~', rawurlencode($value));
}
function _sign($data, $key, $algorithm)
{
  if ($algorithm === 'HmacSHA1') {
    $hash = 'sha1';
  } else if ($algorithm === 'HmacSHA256') {
    $hash = 'sha256';
  } else {
    throw new Exception("Non-supported signing method specified");
  }
  return base64_encode(hash_hmac($hash, $data, $key, true));
}

?>
