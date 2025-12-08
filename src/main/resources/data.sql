INSERT INTO emerald_account (id, balance) VALUES (1, 20000.0);

INSERT INTO campaign (id, name, bid_amount, campaign_fund, status, town, radius, account_id)
VALUES (1, 'Food Campaign ', 20.50, 1000.00, 'ON', 'Warsaw', 50, 1);

INSERT INTO campaign_keywords (campaign_id, keyword) VALUES (1, 'Fish');
INSERT INTO campaign_keywords (campaign_id, keyword) VALUES (1, 'Apple');